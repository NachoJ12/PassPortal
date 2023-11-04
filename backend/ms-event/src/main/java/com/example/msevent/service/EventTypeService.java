package com.example.msevent.service;

import com.example.msevent.exception.ResourceNotFoundException;
import com.example.msevent.model.Category;
import com.example.msevent.repository.IEventTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventTypeService {
    private final IEventTypeRepository repository;

    public List<Category> findAll(){
        return repository.findAll();
    }

    public Optional<Category> findByID(Long id){
        return repository.findById(id);
    }

    public Category save(Category category){
        return repository.save(category);
    }

    public ResponseEntity<Category> put(Category category) throws ResourceNotFoundException {
        Optional<Category> eventTypeOptional = repository.findById(category.getID());
        if (eventTypeOptional.isPresent()) {
            return ResponseEntity.ok().body(repository.save(category));
        } else {
            throw new ResourceNotFoundException("The artist you are trying to modify(id: " + category.getID() + ") does not exist");
        }
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}
