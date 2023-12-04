package com.example.msevent.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Category;
import com.example.msevent.repository.ICategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final String ACCESS = System.getenv("ACCESS");
    private final String SECRET = System.getenv("SECRET");
    BasicAWSCredentials credentials = new BasicAWSCredentials(ACCESS, SECRET);
    private final ICategoryRepository repository;

    public List<Category> findAll(){
        return repository.findAll();
    }

    public Optional<Category> findByID(Long id){
        return repository.findById(id);
    }

    public Category save(Category category, MultipartFile multipartFile){

        AWSCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(credentials);
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(credentialsProvider)
                .withRegion(Regions.US_EAST_1)
                .build();

        try (InputStream fileInputStream = multipartFile.getInputStream()) {
            // Specify the folder name within the bucket
            String folderName = "images/categories";

            // Add a timestamp to the file name for uniqueness
            String key = folderName + "/" + System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();

            // Set content type and other metadata
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());

            // Upload the file directly to S3 without saving it locally
            s3.putObject(new PutObjectRequest("grupo7-bucket", key, fileInputStream, metadata));

            // Construct the S3 object URL
            String s3ObjectUrl = s3.getUrl("grupo7-bucket", key).toString();

            category.setImage(s3ObjectUrl);

        } catch (AmazonServiceException ex) {
            System.exit(1);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        return repository.save(category);
    }

    public ResponseEntity<Category> put(Category category) throws ResourceNotFoundException {
        Optional<Category> eventTypeOptional = repository.findById(category.getID());
        if (eventTypeOptional.isPresent()) {
            return ResponseEntity.ok().body(repository.save(category));
        } else {
            throw new ResourceNotFoundException("The artist you are trying to modify(id: " + category.getID() + ") does not exist");
        }
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}
