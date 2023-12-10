package com.example.msevent.repository;

import com.example.msevent.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IArtistRepository extends JpaRepository<Artist,Long> {


}
