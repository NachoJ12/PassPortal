package com.example.event.repository;

import com.example.event.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IticketRepository extends JpaRepository<Ticket,Long> {

    public List<Ticket> findTicketByEventID(Long id);
}
