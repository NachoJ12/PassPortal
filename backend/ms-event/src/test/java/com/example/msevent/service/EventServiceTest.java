package com.example.msevent.service;

import com.example.msevent.model.*;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import lombok.SneakyThrows;
import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
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
        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category("Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist("La Konga");
        Event event = new Event("20 años",new Date(2023,12,03),new Time(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",venue,category,artist);

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
        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category("Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist("La Konga");
        Event eventToAdd = new Event("20 años",new Date(2023,12,03),new Time(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",venue,category,artist);


        Event eventAdded= eventService.save(eventToAdd);
        eventToAdd.setName("25 años");

        eventService.update(eventToAdd);
        assertEquals("25 años", eventToAdd.getName());
        eventService.delete(eventAdded.getID());

    }
    @Test
    @Order(4)
    public void searchAndDeleteAnEventTest(){
        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category("Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist("La Konga");
        Event eventToAdd = new Event("20 años",new Date(2023,12,03),new Time(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",venue,category,artist);


        Event eventAdded= eventService.save(eventToAdd);


        eventService.delete(eventToAdd.getID());
        Optional<Event> eventSearched=eventService.findbyID(eventToAdd.getID());

        assertTrue(eventSearched.isEmpty());
    }
}
