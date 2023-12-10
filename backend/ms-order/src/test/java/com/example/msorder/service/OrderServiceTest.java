package com.example.msorder.service;

import com.example.msorder.model.Order;
import com.example.msorder.model.Ticket;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.SneakyThrows;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
@SpringBootTest
public class OrderServiceTest {
    @Autowired
    OrderService orderService;
    TicketService ticketService;

    @Test
    //@Order(1)
    public void addOrderTest(){

        Ticket ticket=new Ticket("test",10000.0,2L);
        Ticket responset = ticketService.postTicket(ticket);
        List<Ticket> ticketList = new ArrayList<>();
        ticketList.add(responset);
        Order order=new Order("Mitre 2566",1L,ticketList);
        Order response = orderService.save(order);
        assertNotNull(response);
    }
    @Test
    //@Order(2)
    public void listOrdersTest(){
        //uso el service
        List<Order> orders= orderService.findAll();
        System.out.println("Se listaron las siguientes ordenes: ");
        for (Order o:orders) {
            System.out.println( o.getID());
        }
        //realizo el assert
        assertTrue(orders.size()>0);
    }


    @Test
   // @Order(3)
    public void searchAndDeleteAOrderTest(){

        List<Ticket> ticketList = new ArrayList<>();
        Ticket ticket = new Ticket("regular",100.0,1L);
        ticketList.add(ticket);
        Order order=new Order("Mitre 2566,Cordoba,Arg",1L,ticketList);
        Order orderAdded = orderService.save(order);


        orderService.delete(orderAdded.getID());
        Optional<Order> orderSearched=orderService.findById(orderAdded.getID());

        assertTrue(orderSearched.isEmpty());
    }
}
