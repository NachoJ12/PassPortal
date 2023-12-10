package com.example.msevent.service;

import com.example.msevent.model.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import lombok.SneakyThrows;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class EventServiceTest {

    @Autowired
    EventService eventService;

    @Test
    @Order(1)
    public void addEventTest(){
        Address address= new Address("Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category(1L,"Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist("La Konga");
        Event event = new Event("20 años", LocalDate.of(2023,12,03), LocalTime.of(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",1L,venue,category,artist);

        Event response = eventService.save(event);
        assertNotNull(response);
    }
    @Test
    @Order(2)
    public void listEventsTest(){

        //uso el service
        List<Event> events= eventService.findAll();
        System.out.println("Se listaron los siguientes eventos: ");
        for (Event o:events) {
            System.out.println( o.getName()+" ("+ o.getArtist()+") :"+o.getCategory());
        }
        //realizo el assert
        assertTrue(events.size()>0);
    }

    @SneakyThrows
    @Test
    @Order(3)
    public void editEventTest(){
        Address address= new Address("Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category(1L,"Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist("La Konga");
        Event eventToAdd = new Event("20 años", LocalDate.of(2023,12,03), LocalTime.of(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",1L,venue,category,artist);


        Event eventAdded= eventService.save(eventToAdd);
        eventToAdd.setName("25 años");

        eventService.update(eventToAdd);
        assertEquals("25 años", eventToAdd.getName());
        eventService.delete(eventAdded.getID());

    }
    /*@Test
    @Order(4)
    public void searchAndDeleteAnEventTest(){
        Address address= new Address("Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category(1L,"Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist(1L,"La Konga");
        Event eventToAdd = new Event("20 años",LocalDate.of(2023,12,03), LocalTime.of(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",1L,venue,category,artist);


        Event eventAdded= eventService.save(eventToAdd);


        eventService.delete(eventToAdd.getID());
        Optional<Event> eventSearched= Optional.ofNullable(eventService.findByID(eventToAdd.getID()));

        assertTrue(eventSearched.isEmpty());
    }*/
}
