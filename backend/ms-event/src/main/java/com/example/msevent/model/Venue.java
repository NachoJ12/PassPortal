package com.example.msevent.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "venue")
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String name;

    private Long capacity;

    private String image;

    @OneToOne
    private Address address;
}
