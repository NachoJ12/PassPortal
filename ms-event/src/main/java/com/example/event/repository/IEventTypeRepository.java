package com.example.event.repository;

import com.example.event.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEventTypeRepository extends JpaRepository<Category,Long> {
}
