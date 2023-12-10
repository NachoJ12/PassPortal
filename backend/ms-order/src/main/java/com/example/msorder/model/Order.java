package com.example.msorder.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;

    private LocalDateTime date_time = LocalDateTime.now();

    private Double total_price;

    private String delivery_address;

    @Column(name = "user_id")
    private Long userid;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinColumn(name = "ticket_id", referencedColumnName = "id")
    private List<Ticket> ticket;

    public Order( Double total_price, String delivery_address, Long userid) {

        this.total_price = total_price;
        this.delivery_address = delivery_address;
        this.userid = userid;
    }
}
