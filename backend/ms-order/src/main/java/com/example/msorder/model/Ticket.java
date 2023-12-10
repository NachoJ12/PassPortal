package com.example.msorder.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String name;

    private Double price;

    @Column(name = "event_id")
    private Long eventid;

    public Ticket(String name, Double price, Long eventid) {
        this.name = name;
        this.price = price;
        this.eventid = eventid;
    }
}
