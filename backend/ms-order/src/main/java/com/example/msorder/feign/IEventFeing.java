package com.example.msorder.feign;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="event-service",url = "http://localhost:8092")
@LoadBalancerClient(value="event-service", configuration= LoadBalancerConfiguration.class)
public interface IEventFeing {

        @GetMapping("/events/{id}")
        EventDTO getEventById(@PathVariable Long id);

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


