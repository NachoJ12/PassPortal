package com.example.msevent.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.msevent.Feign.ITicketFeign;

import com.example.msevent.DTO.TicketDTO;
import com.example.msevent.filter.EventSpecifications;
import com.example.msevent.model.*;
import com.example.msevent.DTO.EventDTO;
import com.example.msevent.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final String ACCESS = System.getenv("ACCESS");
    private final String SECRET = System.getenv("SECRET");
    BasicAWSCredentials credentials = new BasicAWSCredentials(ACCESS, SECRET);

    private final IEventRepository repository;
    private final ICategoryRepository categoryRepository;
    private final IArtistRepository artistRepository;
    private final IVenueRepository venueRepository;


    @Autowired
    private final ITicketFeign feign;

    public List<Event> findAll() {
        return repository.findAll();
    }

    public Event save(Event event) {
        return repository.save(event);
    }

    public List<Event> findByName(String name){
        return repository.findByName(name);
    }

    public List<Event> findByDate(LocalDate date){
        return repository.findByDate(date);
    }

    @Transactional
    public void delete(Long id){

        AWSCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(credentials);
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(credentialsProvider)
                .withRegion(Regions.US_EAST_1)
                .build();

        try {
            // Fetch the link from the database
            String link = repository.findAllByID(id).get().getImage();
            String imgName = link.substring(link.lastIndexOf("/")+1);

            // Delete the corresponding S3 object
            String key = "images/events/" + imgName;
            s3.deleteObject(new DeleteObjectRequest("grupo7-bucket",key));

            // Delete the entity from the database
            repository.deleteById(id);
        } catch (AmazonServiceException ex) {
            // Log the exception or handle it as needed
            ex.printStackTrace();
            // You can throw a custom exception if needed
            throw new RuntimeException("Error deleting entity and S3 object", ex);
        }

    }

   public EventDTO findbyIDDTO(Long id) {

        List<TicketDTO> ticketDTOS = feign.ticketByEventID(id);
        Event event = repository.findAllByID(id).get();
        EventDTO eventDTO = new EventDTO(event,ticketDTOS);
        return eventDTO;
    }

    public Event findByID(Long id){
        return repository.findAllByID(id).get();
    }

    public Event update(Event event) {
        return repository.save(event);
    }

    public List<Event> findByArtistName(String name){
        return repository.findByArtistName(name);
    }

    public List<Event> findByCategoryName(String name){
        return repository.findByCategoryName(name);
    }

    public List<Event> findByUserid(Long id){
        return repository.findByUserid(id);
    }

    public TicketDTO createTicket(TicketDTO ticket) {
        return feign.ticketspost(ticket);
    }

    public List<Event> filterEvents(String artistName, List<String> categoryNames,String country, String city, String name, LocalDate date) {
        Specification<Event> spec = EventSpecifications.filterEvents(artistName, categoryNames, country, city, name, date);
        return repository.findAll(spec);
    }

    public List<Event> getRandomEventsWithin30Days() {
        return repository.findRandomEventsWithin30Days();
    }

    public Event saveOrUpdateEvent(Event event,MultipartFile multipartFile) {
        if (event.getCategory().getID() == null) {
            Category cat = categoryRepository.save(event.getCategory());
            Category catToPass = new Category();
            catToPass.setID(cat.getID());
            event.setCategory(catToPass);
        }
        if (event.getArtist().getID() == null) {
            Artist art = artistRepository.save(event.getArtist());
            Artist artToPass= new Artist();
            artToPass.setID(art.getID());
            event.setArtist(artToPass);
        }
        if (event.getVenue().getID() == null) {
            Venue savedVenue = venueRepository.save(event.getVenue());
            Venue venueToPass= new Venue();
            venueToPass.setID(savedVenue.getID());
            event.setVenue(venueToPass);
        }

        AWSCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(credentials);
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(credentialsProvider)
                .withRegion(Regions.US_EAST_1)
                .build();

        try (InputStream fileInputStream = multipartFile.getInputStream()) {
            // Specify the folder name within the bucket
            String folderName = "images/events";

            // Add a timestamp to the file name for uniqueness
            String key = folderName + "/" + System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();

            // Set content type and other metadata
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());

            // Upload the file directly to S3 without saving it locally
            s3.putObject(new PutObjectRequest("grupo7-bucket", key, fileInputStream, metadata));

            // Construct the S3 object URL
            String s3ObjectUrl = s3.getUrl("grupo7-bucket", key).toString();

            event.setImage(s3ObjectUrl);

        } catch (AmazonServiceException ex) {
            System.exit(1);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }

        return(repository.save(event));
    }

}
