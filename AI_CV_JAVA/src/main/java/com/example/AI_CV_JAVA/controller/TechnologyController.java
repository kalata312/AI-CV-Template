package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.service.interfaces.TechnologyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/technology")
@RequiredArgsConstructor
public class TechnologyController {
    private final TechnologyService technologyService;


    @PostMapping
    public ResponseEntity<Technology> saveTechnology(@RequestBody Technology newTechnology, @RequestParam("personId") long personId) {
        if (technologyService.addTechnology(newTechnology.getName(), personId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    public ResponseEntity<List<Technology>> getAllTechnologies() {
        List<Technology> allTechnologies = technologyService.getAllTechnologies();
        return new ResponseEntity<>(allTechnologies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technology> getTechnologyById(@PathVariable Long id) {
        Technology technology = technologyService.getTechnologyById(id);
        return new ResponseEntity<>(technology, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technology> updateTechnology(@PathVariable Long id, @RequestBody Technology toUpdateTechnology) {
        Technology updatedTechnology = technologyService.updateTechnology(id, toUpdateTechnology);
        if (updatedTechnology != null) {
            return new ResponseEntity<>(updatedTechnology, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTechnology(@RequestBody Technology technology, @RequestParam("personId") long personId) {
        technologyService.removeTechnology(technology, personId);
        return ResponseEntity.ok().build();
    }
}