package com.example.msorder.controller;

import com.example.msorder.model.Ticket;
import com.example.msorder.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/ticket")
public class TicketController {

    private final TicketService service;

    @GetMapping("/event/{id}")
    public ResponseEntity<List<Ticket>> findTicketByEventId(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findTicketByEventId(id));
    }

    @PostMapping
    public ResponseEntity<Ticket> postTicket(@RequestBody Ticket ticket){
        return ResponseEntity.status(201).body(service.postTicket(ticket));
    }

    @PutMapping
    public ResponseEntity<Ticket> putTicket(@RequestBody Ticket ticket){
        return ResponseEntity.ok().body(service.postTicket(ticket));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id){
        Optional<Ticket> event = service.findTicketById(id);
        if (event.isPresent()){
            service.deleteTicket(id);
            return ResponseEntity.ok("Deleted successfully");}
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> findTicketById(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findTicketById(id).get());
    }

}
