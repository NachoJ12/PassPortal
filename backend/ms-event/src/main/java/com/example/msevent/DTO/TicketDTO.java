package com.example.msevent.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TicketDTO {

    private Long id;

    private String name;

    private Double price;

    private Long eventid;

}
