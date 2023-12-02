package com.example.msorder.repository;

import com.example.msorder.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserid(Long id);

    @Query("SELECT o FROM Order o WHERE MONTH(o.date_time) = :month")
    List<Order> findOrdersByMonth(int month);
}
