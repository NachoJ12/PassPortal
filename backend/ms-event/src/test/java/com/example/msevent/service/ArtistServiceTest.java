package com.example.msevent.service;

import com.example.msevent.model.Address;
import com.example.msevent.model.Artist;
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
public class ArtistServiceTest {

    @Autowired
     ArtistService artistService;

    @Test
    @Order(1)
    public void addArtistTest(){
        Artist artist = new Artist("La Konga");

        Artist response = artistService.save(artist);
        assertNotNull(response);
    }
    @Test
    @Order(2)
    public void listArtistsTest(){

        //uso el service
        List<Artist> artists= artistService.findAll();
        System.out.println("Se listaron los siguientes artistas: ");
        for (Artist o:artists) {
            System.out.println( o.getName());
        }
        //realizo el assert
        assertTrue(artists.size()>0);
    }

    @SneakyThrows
    @Test
    @Order(3)
    public void editArtistTest(){
        Artist artistToAdd = new Artist("la Konga");
        Artist artistAdded= artistService.save(artistToAdd);
        artistToAdd.setName("Q Lokura");

        artistService.put(artistToAdd);
        assertEquals("Q Lokura", artistToAdd.getName());
        artistService.delete(artistAdded.getID());
    }
    @Test
    @Order(4)
    public void searchAndDeleteArtistTest(){
        Artist artistToAdd = new Artist("la Konga");
        Artist artistAdded= artistService.save(artistToAdd);


        artistService.delete(artistToAdd.getID());
        Optional<Artist> artistSearched=artistService.findByID(artistToAdd.getID());

        assertTrue(artistSearched.isEmpty());
    }
}
