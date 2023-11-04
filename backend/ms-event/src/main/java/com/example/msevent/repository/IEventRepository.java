package com.example.msevent.repository;

import com.example.msevent.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IEventRepository extends JpaRepository<Event, Long> {
    List<Event> findByName(String name);
    List<Event> findByDate(LocalDate date);
    Optional<Event> findAllByID(Long ID);

    List<Event> findByArtistName(String name);

    List<Event> findByCategoryName(String name);

    //TODO No sirve
    //List<Event> findByVenueAddressCity(String city);
}
