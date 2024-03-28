package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Technology;

import java.util.List;
import java.util.Optional;

public interface TechnologyService {

    Technology saveTechnology(Technology technology);

    List<Technology> getAllTechnologies();

    Technology getTechnologyById(Long id);

    Technology updateTechnology(Long id, Technology toUpdateTechnology);

    void deleteTechnology(Long id);

    boolean addTechnology(String name, long personId);

    Optional<Technology> findTechnology(String name);

    void removeTechnology(Technology technology, long personId);
}

