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
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
@SpringBootTest
public class OrderServiceTest {
    @Autowired
    OrderService orderService;

    @Test
    //@Order(1)
    public void addOrderTest(){

        Order order=new Order(10000.0,"Mitre 2566,Cordoba,Arg",1L);
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

        Order orderToAdd=new Order(10000.0,"Mitre 2566,Cordoba,Arg",1L);
        Order orderAdded = orderService.save(orderToAdd);


        orderService.delete(orderToAdd.getID());
        Optional<Order> orderSearched=orderService.findById(orderToAdd.getID());

        assertTrue(orderSearched.isEmpty());
    }
}
