package com.example.msorder.service;

import com.example.msorder.model.Ticket;
import jdk.jfr.Event;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TicketServiceTest {
   @Autowired
    TicketService ticketService;

   @Test
   @Order(1)
    public void addTicketTest(){

        Ticket ticket=new Ticket("00001",10000.0,2L);
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
    public void searchAndDeleteATicketTest(){

        Ticket ticketToAdd=new Ticket("00001",10000.0,2L);
        Ticket ticketAdded= ticketService.postTicket(ticketToAdd);


        ticketService.deleteTicket(ticketToAdd.getID());
        Optional<Ticket> ticketSearched=ticketService.findTicketById(ticketToAdd.getID());

       assertTrue(ticketSearched.isEmpty());
    }
}
