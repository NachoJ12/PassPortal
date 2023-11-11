package com.example.msevent.service;

import com.example.msevent.model.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class CategoryServiceTest {

    @Autowired
     EventTypeService categoryService;

    @Test
    public void agregarCategoriaTest(){
        Category categoria = new Category("sdsad", "test", "http://image");

        Category respuesta = categoryService.save(categoria);
        assertNotNull(respuesta);
    }
}
