package com.example.msorder.service;

import com.example.msorder.model.Order;
import com.example.msorder.model.Ticket;
import com.example.msorder.repository.IOrderRepository;
import com.example.msorder.repository.IticketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final IOrderRepository repository;
    private final IticketRepository ticketrepository;

    public List<Order> findAll() {
        return repository.findAll();
    }

    public Optional<Order> findById(Long id){
        return repository.findById(id);
    }

    public Order save(Order order) {
        Double tot  = 0.0;
        for (Ticket tickets: order.getTicket()
             ) {
            Ticket tot2 = ticketrepository.findById(tickets.getID()).get();
            tot += tot2.getPrice();
        }
        order.setTotal_price(tot);
        return repository.save(order);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Order update(Order order) {
        return repository.save(order);
    }

    public List<Order> findByUserid(Long id){
        return repository.findByUserid(id);
    }

}
