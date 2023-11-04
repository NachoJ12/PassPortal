package com.example.msevent.controller;

import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Category;
import com.example.msevent.service.EventTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/category")
public class EventTypeController {

    private final EventTypeService service;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findByID(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findByID(id).get());
    }

    @PostMapping
    public ResponseEntity<Category> save(@RequestBody Category category){
        return ResponseEntity.ok().body(service.save(category));
    }

    @PutMapping
    public ResponseEntity<Category> put(@RequestBody Category category) throws ResourceNotFoundException {
        return service.put(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Category> eventType = service.findByID(id);
        if (eventType.isPresent()){
            service.delete(id);
            return ResponseEntity.ok("Deleted successfully");}
        return ResponseEntity.notFound().build();
    }
}
