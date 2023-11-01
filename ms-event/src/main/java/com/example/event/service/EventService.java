package com.example.event.service;

import com.example.event.model.Event;
import com.example.event.repository.IEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final IEventRepository repository;

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
    public void delete(Long id){
        repository.deleteById(id);
    }

    public Optional<Event> findbyID(Long id) {
        return repository.findAllByID(id);
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

    /*public List<Event> findByVenueAddressCity(String city){
        return repository.findByVenueAddressCity(city);
    }*/

}
