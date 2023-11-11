package com.example.msevent.service;

import com.example.msevent.model.Event;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class EventServiceTest {

    @Autowired
    EventService eventService;

    @Test
    public void listarEventosTest(){
        List<Event> eventos = eventService.findAll();
        assertNotNull(eventos);
        assertEquals(eventos.size(), 1);
    }
}
