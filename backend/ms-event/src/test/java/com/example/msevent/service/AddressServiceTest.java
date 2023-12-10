package com.example.msevent.service;

import com.example.msevent.model.Address;
import com.example.msevent.model.Category;
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
public class AddressServiceTest {

    @Autowired
     AddressService addressService;

    @Test
    @Order(1)
    public void addAddressTest(){
        Address address = new Address("Oliveros","Córdoba","Argentina");

        Address response = addressService.save(address);
        assertNotNull(response);
    }
    @Test
    @Order(2)
    public void listAddressesTest(){

        //uso el service
        List<Address> addresses= addressService.findAll();
        System.out.println("Se listaron las siguientes direcciones: ");
        for (Address o:addresses) {
            System.out.println( o.getStreet()+": "+o.getCity());
        }
        //realizo el assert
        assertTrue(addresses.size()>0);
    }

    @SneakyThrows
    @Test
    @Order(3)
    public void editAddressTest(){
        Address addressToAdd = new Address("Oliveros","Córdoba","Argentina");
        Address addressAdded= addressService.save(addressToAdd);
        addressToAdd.setStreet("Zeballos");

        addressService.put(addressToAdd);
        assertEquals("Zeballos", addressToAdd.getStreet());
        addressService.delete(addressAdded.getID());
    }
    @Test
    @Order(4)
    public void searchAndDeleteAddressTest(){
        Address addressToAdd = new Address("Oliveros","Córdoba","Argentina");
        Address addressAdded= addressService.save(addressToAdd);


        addressService.delete(addressToAdd.getID());
        Optional<Address> addressSearched=addressService.findByID(addressToAdd.getID());

        assertTrue(addressSearched.isEmpty());
    }
}
