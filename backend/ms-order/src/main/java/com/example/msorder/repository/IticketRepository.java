package com.example.msorder.repository;

import com.example.msorder.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IticketRepository extends JpaRepository<Ticket,Long> {

    public List<Ticket> findTicketByEventid(Long id);
}
