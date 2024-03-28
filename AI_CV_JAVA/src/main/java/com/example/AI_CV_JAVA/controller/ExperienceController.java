package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.service.impl.ExperienceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("experience")
@RequiredArgsConstructor
public class ExperienceController {
    private final ExperienceServiceImpl experienceServiceImpl;

    @PostMapping
    public ResponseEntity<Experience> saveExperience(@RequestBody Experience experience) {
        Experience savedExperience = experienceServiceImpl.saveExperience(experience);
        return new ResponseEntity<>(savedExperience, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {
        List<Experience> allExperiences = experienceServiceImpl.getAllExperience();
        return new ResponseEntity<>(allExperiences, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable Long id) {
        Experience experience = experienceServiceImpl.getExperienceById(id);
        return new ResponseEntity<>(experience, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience toUpdateExperience) {
        Experience updatedExperience = experienceServiceImpl.updateExperience(id, toUpdateExperience);
        if (updatedExperience != null) {
            return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        experienceServiceImpl.deleteExperience(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
