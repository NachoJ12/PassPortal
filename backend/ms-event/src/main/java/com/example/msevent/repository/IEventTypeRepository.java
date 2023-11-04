package com.example.msevent.repository;

import com.example.msevent.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEventTypeRepository extends JpaRepository<Category,Long> {
}
