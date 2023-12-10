package com.example.msevent.repository;

import com.example.msevent.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVenueRepository extends JpaRepository<Venue,Long> {

}
