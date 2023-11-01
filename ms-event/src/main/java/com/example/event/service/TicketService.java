package com.example.event.service;

import com.example.event.model.Ticket;
import com.example.event.repository.IticketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final IticketRepository repository;

    public List<Ticket> findTicketByEventId(Long id){
        return repository.findTicketByEventID(id);
    }
    public Optional<Ticket> findTicketById(Long id){
        return repository.findById(id);
    }

    public Ticket postTicket(Ticket ticket){
        return repository.save(ticket);
    }

    public void deleteTicket(Long id){
        repository.deleteById(id);
    }
}
