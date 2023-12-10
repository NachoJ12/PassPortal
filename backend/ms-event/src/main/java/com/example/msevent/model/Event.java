package com.example.msevent.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;

    private String name;

    private LocalDate date;

    private LocalTime time;

    private String description;

    private long stock;

    private String image;

    @Column(name = "user_id")
    private Long userid;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "venue_id", referencedColumnName = "ID")
    private Venue venue;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "category_id", referencedColumnName = "ID")
    private Category category;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "artist_id", referencedColumnName = "ID")
    private Artist artist;

    public Event(String name, LocalDate date, LocalTime time, String description, long stock, String image, Long userid, Venue venue, Category category, Artist artist) {
        this.name = name;
        this.date = date;
        this.time = time;
        this.description = description;
        this.stock = stock;
        this.image = image;
        this.userid = userid;
        this.venue = venue;
        this.category = category;
        this.artist = artist;
    }
}