package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.Entity.Education;
import com.example.AI_CV_JAVA.service.interfaces.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("education")
@RequiredArgsConstructor
public class EducationController {
    private final EducationService educationService;

    @PostMapping
    public ResponseEntity<Education> saveEducation(@RequestBody Education education, @RequestParam Long personId) {
        Education savedEducation = educationService.saveEducation(education, personId);
        return new ResponseEntity<>(savedEducation, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Education>> getAllEducations() {
        List<Education> educations = educationService.getAllEducations();
        return new ResponseEntity<>(educations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        Education education = educationService.getEducationById(id);
        return new ResponseEntity<>(education, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education toUpdate) {
        Education updatedEducation = educationService.updateEducation(id, toUpdate);
        return new ResponseEntity<>(updatedEducation, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
