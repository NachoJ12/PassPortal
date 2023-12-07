package com.example.msevent.controller;

import com.example.msevent.DTO.TicketDTO;
import com.example.msevent.model.Event;
import com.example.msevent.DTO.EventDTO;
import com.example.msevent.service.EventService;
import lombok.RequiredArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService service;

    @GetMapping("/all")
    public ResponseEntity<List<Event>> findAll() {
        return ResponseEntity.ok().body(service.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}", produces = "application/json")
    public ResponseEntity<EventDTO> findbyID(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findbyIDDTO(id));
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

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Event>> findByUserid(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findByUserid(id));
    }
    @GetMapping("/random")
    public ResponseEntity<List<Event>> getRandomEventsWithin30Days() {
        return ResponseEntity.ok().body(service.getRandomEventsWithin30Days());
    }

    @GetMapping()
    public ResponseEntity<List<Event>> filter(
            @RequestParam(name = "artist", required = false) String artist,
            @RequestParam(name = "categories", required = false) List<String> categoryNames,
            @RequestParam(name ="city", required = false) String city,
            @RequestParam(name ="country", required = false) String country,
            @RequestParam(name ="name", required = false) String name,
            @RequestParam(name ="date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
            ){
        return ResponseEntity.ok().body(service.filterEvents(artist, categoryNames, country, city, name, date));
    }

    @PostMapping
    public ResponseEntity<EventDTO> save(@RequestPart("data") EventDTO eventDTO, @RequestParam("file")MultipartFile multifile){
        Event e = service.saveOrUpdateEvent(eventDTO.getEvent(),multifile);
        for (TicketDTO ticket : eventDTO.getTicketDTOList()) {
            ticket.setEventid(e.getID());
            service.createTicket(ticket);
        }
        return ResponseEntity.ok().body(eventDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Event event = service.findByID(id);
        if (event != null){
         service.delete(id);
         return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> put(@RequestBody Event event){
        return ResponseEntity.ok().body(service.update(event));
    }

}
