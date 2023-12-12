package com.example.msorder.feign;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="event-service",url = "http://localhost:8092/events")
@LoadBalancerClient(value="event-service", configuration= LoadBalancerConfiguration.class)
public interface IEventFeign {

        @GetMapping("/{id}")
        EventDTO getEventById(@PathVariable Long id);
        @PutMapping()
        EventDTO updateStock(@RequestBody EventDTOStock eventDTOStock);

        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        class EventDTO {
            private Event event;
        }

        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        class Event {
            private Long ID;
            private String name;
        }


}


