package com.example.msevent.service;

import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Address;
import com.example.msevent.repository.IAddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final IAddressRepository repository;

    public List<Address> findAll(){
        return repository.findAll();
    }

    public Optional<Address> findByID(Long id){
        return repository.findById(id);
    }

    public Address save(Address address){
        return repository.save(address);
    }

    public ResponseEntity<Address> put(Address address) throws ResourceNotFoundException {
        Optional<Address> addressOptional = repository.findById(address.getID());
        if (addressOptional.isPresent()) {
            return ResponseEntity.ok().body(repository.save(address));
        } else {
            throw new ResourceNotFoundException("The artist you are trying to modify(id: " + address.getID() + ") does not exist");
        }
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

}
