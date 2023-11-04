package com.example.event.controller;

import com.example.event.model.Event;
import com.example.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService service;

    @GetMapping("/all")
    public ResponseEntity<List<Event>> findAll() {
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Event> findbyID(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findbyID(id).get());
    }
    @GetMapping("/date")
    public ResponseEntity<List<Event>> findByDate(@RequestParam("date")
        @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return ResponseEntity.ok().body(service.findByDate(date));
    }

    @GetMapping("/name")
    public ResponseEntity<List<Event>> findByName(@RequestParam("name") String name) {
        return ResponseEntity.ok().body(service.findByName(name));
    }
    @GetMapping("/artist")
    public ResponseEntity<List<Event>> findByArtistName(@RequestParam("name") String name) {
        return ResponseEntity.ok().body(service.findByArtistName(name));
    }
    @GetMapping("/category")
    public ResponseEntity<List<Event>> findByCategoryName(@RequestParam("name") String name) {
        return ResponseEntity.ok().body(service.findByCategoryName(name));
    }
    /*
    @GetMapping("/city")
    public ResponseEntity<List<Event>> findByVenueAddressCity(@RequestParam("name") String city) {
        return ResponseEntity.ok().body(service.findByVenueAddressCity(city));
    }*/

    @PostMapping
    public ResponseEntity<Event> save(@RequestBody Event event){
        return ResponseEntity.ok().body(service.save(event));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Event> event = service.findbyID(id);
        if (event.isPresent()){
         service.delete(id);
         return ResponseEntity.ok("Deleted successfully");}
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> put(@RequestBody Event event){
        return ResponseEntity.ok().body(service.update(event));
    }



}
