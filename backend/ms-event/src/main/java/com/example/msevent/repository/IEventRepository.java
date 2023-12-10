package com.example.msevent.repository;

import com.example.msevent.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IEventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {
    List<Event> findByName(String name);
    List<Event> findByDate(LocalDate date);
    Optional<Event> findAllByID(Long ID);

    List<Event> findByArtistName(String name);

    List<Event> findByCategoryName(String name);

    List<Event> findByUserid(Long id);

    @Query(value = "SELECT * " +
            "FROM event " +
            "WHERE date >= CURDATE() AND date <= CURDATE() + INTERVAL 30 DAY " +
            "ORDER BY RAND() " +
            "LIMIT 6;", nativeQuery = true)
    List<Event> findRandomEventsWithin30Days();

    //TODO No sirve
    //List<Event> findByVenueAddressCity(String city);
}
