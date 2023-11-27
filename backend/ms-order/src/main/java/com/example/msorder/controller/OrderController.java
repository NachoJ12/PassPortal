package com.example.msorder.controller;

import com.example.msorder.model.Order;
import com.example.msorder.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;


    @GetMapping("/all")
    public ResponseEntity<List<Order>> findAll() {
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findbyID(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findById(id).get());
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Order>> findbyUserid(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findByUserid(id));
    }

    @PostMapping
    public ResponseEntity<Order> save(@RequestBody Order order){
        return ResponseEntity.ok().body(service.save(order));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Order> order = service.findById(id);
        if (order.isPresent()){
         service.delete(id);
         return ResponseEntity.ok("Deleted successfully");}
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> put(@RequestBody Order order){
        return ResponseEntity.ok().body(service.update(order));
    }



}
