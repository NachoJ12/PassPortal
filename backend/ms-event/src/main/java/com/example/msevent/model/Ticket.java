package com.example.msevent.model;

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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;
}
