package com.example.msorder.controller;

import com.example.msorder.model.Order;
import com.example.msorder.service.OrderService;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
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

    @GetMapping("/pdf/{month}/{year}")
    public ResponseEntity<byte[]> exportPdf(@PathVariable int month,@PathVariable int year) throws IOException, DocumentException {

        ByteArrayOutputStream pdfStream = service.generatePdfStream(month,year);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ReportOfTheMonth"+month+year+".pdf");
        headers.setContentLength(pdfStream.size());
        return new ResponseEntity<>(pdfStream.toByteArray(), headers, HttpStatus.OK);
    }

}
