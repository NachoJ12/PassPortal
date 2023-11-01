package com.example.event.repository;

import com.example.event.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IArtistRepository extends JpaRepository<Artist,Long> {


}
