package com.example.msevent.controller;

import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Address;
import com.example.msevent.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {

    private final AddressService service;

    @GetMapping("/all")
    public ResponseEntity<List<Address>> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> findByID(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findByID(id).get());
    }

    @PostMapping
    public ResponseEntity<Address> save(@RequestBody Address address){
        return ResponseEntity.ok().body(service.save(address));
    }

    @PutMapping
    public ResponseEntity<Address> put(@RequestBody Address address) throws ResourceNotFoundException {
        return service.put(address);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Address> address = service.findByID(id);
        if (address.isPresent()){
            service.delete(id);
            return ResponseEntity.ok("Deleted successfully");}
        return ResponseEntity.notFound().build();
    }
}
