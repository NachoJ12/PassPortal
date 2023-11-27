package com.example.msevent.DTO;

import com.example.msevent.model.Event;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventDTO {
    @JsonProperty("event")
    private Event event;
    @JsonProperty("tickets")
    public List<TicketDTO> ticketDTOList;

    public EventDTO(Event event, List<TicketDTO> ticketDTOList) {
        this.event = event;
        this.ticketDTOList = ticketDTOList;
    }
}
