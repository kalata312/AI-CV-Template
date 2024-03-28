package com.example.AI_CV_JAVA.Repo;

import com.example.AI_CV_JAVA.Entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechnologyRepository extends JpaRepository<Technology, Long> {
    @Query("SELECT t FROM Technology t WHERE t.name = :name")
    Optional<Technology> findByName(@Param("name") String name);
}
