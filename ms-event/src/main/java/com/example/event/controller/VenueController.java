package com.example.event.controller;


import com.example.event.exception.ResourceNotFoundException;
import com.example.event.model.Artist;
import com.example.event.model.Venue;
import com.example.event.service.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/venue")
@RequiredArgsConstructor
public class VenueController {

    private final VenueService service;

    @GetMapping("/all")
    public ResponseEntity<List<Venue>> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> findByID(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findByID(id).get());
    }

    @PostMapping
    public ResponseEntity<Venue> save(@RequestBody Venue venue){
        return ResponseEntity.ok().body(service.save(venue));
    }

    @PutMapping
    public ResponseEntity<Venue> put(@RequestBody Venue venue) throws ResourceNotFoundException {
        return service.put(venue);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Venue> venue = service.findByID(id);
        if (venue.isPresent()){
            service.delete(id);
            return ResponseEntity.ok("Deleted successfully");}
        return ResponseEntity.notFound().build();
    }
}
