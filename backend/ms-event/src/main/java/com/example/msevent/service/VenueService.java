package com.example.msevent.service;

import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Venue;
import com.example.msevent.repository.IVenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VenueService {

    private final IVenueRepository repository;

    public List<Venue> findAll(){
        return repository.findAll();
    }

    public Optional<Venue> findByID(Long id){
        return repository.findById(id);
    }

    public Venue save(Venue venue){
        return repository.save(venue);
    }

    public ResponseEntity<Venue> put(Venue venue) throws ResourceNotFoundException {
        Optional<Venue> venueOptional = repository.findById(venue.getID());
        if (venueOptional.isPresent()) {
            return ResponseEntity.ok().body(repository.save(venue));
        } else {
            throw new ResourceNotFoundException("The artist you are trying to modify(id: " + venue.getID() + ") does not exist");
        }
    }

    public void delete(Long id){
        repository.deleteById(id);
    }


}
