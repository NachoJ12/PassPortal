package com.example.msevent.service;

import com.example.msevent.model.*;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TicketServiceTest {

    @Autowired
    TicketService ticketService;

    @Test
    @Order(1)
    public void addTicketTest(){
        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category("Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist("La Konga");
        Event event = new Event("20 años",new Date(2023,12,03),new Time(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",venue,category,artist);

        Ticket ticket=new Ticket("00001",event);
        Ticket response = ticketService.postTicket(ticket);
        assertNotNull(response);
    }
    @Test
    @Order(2)
    public void listTicketsTestByEvent(){

        //uso el service
        List<Ticket> tickets= ticketService.findTicketByEventId(2L);
        System.out.println("Se listaron los siguientes tickets para el evento: ");
        for (Ticket o:tickets) {
            System.out.println( o.getName());
        }
        //realizo el assert
        assertTrue(tickets.size()>0);
    }


    @Test
    @Order(3)
    public void searchAndDeleteAVenueTest(){
        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Category category = new Category("Bailes", "Cuarteto cordobés", "imageCuarteto");
        Artist artist = new Artist("La Konga");
        Event event = new Event("20 años",new Date(2023,12,03),new Time(22,00,00),"El grupo más famoso del momento",20000,"imageEvent",venue,category,artist);

        Ticket ticketToAdd=new Ticket("00001",event);
        Ticket ticketAdded= ticketService.postTicket(ticketToAdd);


        ticketService.deleteTicket(ticketToAdd.getID());
        Optional<Ticket> ticketSearched=ticketService.findTicketById(ticketToAdd.getID());

        assertTrue(ticketSearched.isEmpty());
    }
}
