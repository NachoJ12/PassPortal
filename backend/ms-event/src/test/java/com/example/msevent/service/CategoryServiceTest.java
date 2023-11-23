package com.example.msevent.service;

import com.example.msevent.model.Category;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CategoryServiceTest {

    @Autowired
    CategoryService categoryService;

    @Test
    @Order(1)
    public void addCategoryTest(){
        Category category = new Category("Infantiles", "Ideal para tus hijos", "imagenInf");

        Category response = categoryService.save(category);
        assertNotNull(response);
    }
    @Test
    @Order(2)
    public void listCategoriesTest(){

        //uso el service
        List<Category> categories= categoryService.findAll();
        System.out.println("Se listaron las siguientes categorias: ");
        for (Category o:categories) {
            System.out.println( o.getName()+": "+o.getDescription());
        }
        //realizo el assert
        assertTrue(categories.size()>0);
    }



    @SneakyThrows
    @Test
    @Order(3)
    public void editCategoryTest(){
        Category categoryToAdd = new Category("Infantiles","Ideal para tus hijos","imagenInf");
        Category categoryAdded= categoryService.save(categoryToAdd);
        categoryToAdd.setDescription("Ideal para niños y preadolescentes");

        categoryService.put(categoryToAdd);
        assertEquals("Ideal para niños y preadolescentes", categoryToAdd.getDescription());
        categoryService.delete(categoryAdded.getID());
    }
    @Test
    @Order(4)
    public void searchAndDeleteCategoryTest(){
        Category categoryToAdd = new Category("Infantiles","Ideal para tus hijos","imagenInf");
        Category categoryAdded= categoryService.save(categoryToAdd);


        categoryService.delete(categoryToAdd.getID());
        Optional<Category> categorySearched=categoryService.findByID(categoryToAdd.getID());

        assertTrue(categorySearched.isEmpty());
    }}

