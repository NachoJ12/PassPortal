package com.example.msevent.controller;

import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Artist;
import com.example.msevent.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/artist")
public class ArtistController {

    private final ArtistService service;

    @GetMapping("/all")
    public ResponseEntity<List<Artist>> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artist> findByID(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findByID(id).get());
    }

    @PostMapping
    public ResponseEntity<Artist> save(@RequestBody Artist artist){
        return ResponseEntity.ok().body(service.save(artist));
    }

    @PutMapping
    public ResponseEntity<Artist> put(@RequestBody Artist artist) throws ResourceNotFoundException {
        return service.put(artist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Artist> artist = service.findByID(id);
        if (artist.isPresent()){
            service.delete(id);
            return ResponseEntity.ok("Deleted successfully");}
        return ResponseEntity.notFound().build();
    }
}
