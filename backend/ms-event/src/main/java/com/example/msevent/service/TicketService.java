package com.example.msevent.service;

import com.example.msevent.model.Ticket;
import com.example.msevent.repository.ITicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final ITicketRepository repository;

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
