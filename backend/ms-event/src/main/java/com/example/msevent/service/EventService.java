package com.example.msevent.service;

import com.example.msevent.Feign.ITicketFeign;

import com.example.msevent.DTO.TicketDTO;
import com.example.msevent.filter.EventSpecifications;
import com.example.msevent.model.*;
import com.example.msevent.DTO.EventDTO;
import com.example.msevent.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final IEventRepository repository;
    private final ICategoryRepository categoryRepository;
    private final IArtistRepository artistRepository;
    private final IVenueRepository venueRepository;


    @Autowired
    private final ITicketFeign feign;

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

   public EventDTO findbyIDDTO(Long id) {

        List<TicketDTO> ticketDTOS = feign.ticketByEventID(id);
        Event event = repository.findAllByID(id).get();
        EventDTO eventDTO = new EventDTO(event,ticketDTOS);
        return eventDTO;
    }

    public Event findByID(Long id){
        return repository.findAllByID(id).get();
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

    public List<Event> findByUserid(Long id){
        return repository.findByUserid(id);
    }

    public TicketDTO createTicket(TicketDTO ticket) {
        return feign.ticketspost(ticket);
    }

    public List<Event> filterEvents(String artistName, List<String> categoryNames,String country, String city) {
        Specification<Event> spec = EventSpecifications.filterEvents(artistName, categoryNames, country, city);
        return repository.findAll(spec);
    }

    public List<Event> getRandomEventsWithin30Days() {
        return repository.findRandomEventsWithin30Days();
    }

    public Event saveOrUpdateEvent(Event event) {
        if (event.getCategory().getID() == null) {
            Category cat = categoryRepository.save(event.getCategory());
            Category catToPass = new Category();
            catToPass.setID(cat.getID());
            event.setCategory(catToPass);
        }
        if (event.getArtist().getID() == null) {
            Artist art = artistRepository.save(event.getArtist());
            Artist artToPass= new Artist();
            artToPass.setID(art.getID());
            event.setArtist(artToPass);
        }
        if (event.getVenue().getID() == null) {
            Venue savedVenue = venueRepository.save(event.getVenue());
            Venue venueToPass= new Venue();
            venueToPass.setID(savedVenue.getID());
            event.setVenue(venueToPass);
        }
        return(repository.save(event));
    }
}
