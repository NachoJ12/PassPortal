package com.example.msevent.service;

import com.example.msevent.model.Address;
import com.example.msevent.model.Artist;
import com.example.msevent.model.Category;
import com.example.msevent.model.Venue;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class VenueServiceTest {

    @Autowired
     VenueService venueService;

    @Test
    @Order(1)
    public void addVenueTest(){

        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venue = new Venue("Orfeo",15000L,"imageOrfeo",address);

        Venue response = venueService.save(venue);
        assertNotNull(response);
    }
    @Test
    @Order(2)
    public void listVenuesTest(){

        //uso el service
        List<Venue> venues= venueService.findAll();
        System.out.println("Se listaron los siguientes estadios: ");
        for (Venue o:venues) {
            System.out.println( o.getName()+" ("+ o.getCapacity()+") :"+o.getAddress());
        }
        //realizo el assert
        assertTrue(venues.size()>0);
    }

    @SneakyThrows
    @Test
    @Order(3)
    public void editVenueTest(){
        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venueToAdd = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Venue venueAdded= venueService.save(venueToAdd);
        venueToAdd.setCapacity(20000L);

        venueService.put(venueToAdd);
        assertEquals(20000L, venueToAdd.getCapacity());
        venueService.delete(venueAdded.getID());

    }
    @Test
    @Order(4)
    public void searchAndDeleteAVenueTest(){
        Address address= new Address(1,"Oliveros","Córdoba","Argentina");
        Venue venueToAdd = new Venue("Orfeo",15000L,"imageOrfeo",address);
        Venue venueAdded= venueService.save(venueToAdd);


        venueService.delete(venueToAdd.getID());
        Optional<Venue> venueSearched=venueService.findByID(venueToAdd.getID());

        assertTrue(venueSearched.isEmpty());
    }
}
