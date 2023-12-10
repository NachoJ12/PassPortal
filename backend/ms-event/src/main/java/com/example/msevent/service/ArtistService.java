package com.example.msevent.service;

import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Artist;
import com.example.msevent.repository.IArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final IArtistRepository repository;

    public List<Artist> findAll(){
        return repository.findAll();
    }

    public Optional<Artist> findByID(Long id){
        return repository.findById(id);
    }

    public Artist save(Artist artist){
        return repository.save(artist);
    }

    public ResponseEntity<Artist> put(Artist artist) throws ResourceNotFoundException {
        Optional<Artist> artistOptional = repository.findById(artist.getID());
        if (artistOptional.isPresent()) {
            return ResponseEntity.ok().body(repository.save(artist));
        } else {
            throw new ResourceNotFoundException("The artist you are trying to modify(id: " + artist.getID() + ") does not exist");
        }
    }

    public void delete(Long id){
        repository.deleteById(id);
    }


}
