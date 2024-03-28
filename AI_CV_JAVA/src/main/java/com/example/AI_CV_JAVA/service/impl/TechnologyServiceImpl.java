package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.Repo.TechnologyRepository;
import com.example.AI_CV_JAVA.exception.DataNotFoundException;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import com.example.AI_CV_JAVA.service.interfaces.TechnologyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TechnologyServiceImpl implements TechnologyService {
    private final TechnologyRepository technologyRepository;
    private final PersonService personService;

    public Technology saveTechnology(Technology technology) {
        return technologyRepository.saveAndFlush(technology);
    }

    public List<Technology> getAllTechnologies() {
        return technologyRepository.findAll();
    }

    @Override
    public Technology getTechnologyById(Long id) {
        return technologyRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Technology with id " + id + " not found"));
    }

    @Override
    public Technology updateTechnology(Long id, Technology toUpdateTechnology) {
        technologyRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Technology with id " + id + " not found"));
        toUpdateTechnology.setId(id);
        return technologyRepository.save(toUpdateTechnology);
    }

    @Override
    public void deleteTechnology(Long id) {
        technologyRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Technology with id " + id + " not found"));
        technologyRepository.deleteById(id);
    }

    @Override
    public boolean addTechnology(String name, long personId) {
        Optional<Technology> technology = technologyRepository.findByName(name);
        if (technology.isEmpty()) {
            Technology technology1 = new Technology();
            technology1.setName(name);
            personService.addTechnology(technologyRepository.saveAndFlush(technology1), personId);
        } else {
            personService.addTechnology(technology.get(), personId);
        }
        return true;
    }

    @Override
    public Optional<Technology> findTechnology(String name) {
        return technologyRepository.findByName(name);
    }

    @Override
    public void removeTechnology(Technology technology, long personId) {
        Technology technologyToDelete = technologyRepository.findByName(technology.getName()).orElseThrow(() ->new DataNotFoundException("Technology with name " + technology.getName() + " not found") );
        personService.removeTechnology(technologyToDelete, personId);
    }
}





