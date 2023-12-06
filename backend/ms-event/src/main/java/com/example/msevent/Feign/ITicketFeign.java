package com.example.msevent.Feign;

import com.example.msevent.DTO.TicketDTO;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@FeignClient(name="order",url = "http://localhost:8089")
@LoadBalancerClient(value="order", configuration= LoadBalancerConfiguration.class)
public interface ITicketFeign {

    @GetMapping("/ticket/event/{id}")
    List<TicketDTO> ticketByEventID(@PathVariable Long id);

    @PostMapping("/ticket")
    TicketDTO ticketspost(@RequestBody TicketDTO ticket);

}