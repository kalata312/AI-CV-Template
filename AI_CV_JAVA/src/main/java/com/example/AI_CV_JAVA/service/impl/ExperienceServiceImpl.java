package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.Repo.ExperienceRepository;
import com.example.AI_CV_JAVA.exception.DataNotFoundException;
import com.example.AI_CV_JAVA.service.interfaces.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {
    private final ExperienceRepository experienceRepository;

    public Experience saveExperience(Experience experience) {
        return experienceRepository.saveAndFlush(experience);
    }

    public List<Experience> getAllExperience() {
        return experienceRepository.findAll();
    }

    public Experience getExperienceById(Long id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Experience with id " + id + " not found"));
    }

    public Experience updateExperience(Long id, Experience toUpdate) {
        experienceRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Experience with id " + id + " not found"));
        toUpdate.setId(id);
        return experienceRepository.save(toUpdate);
    }

    public void deleteExperience(Long id) {
        experienceRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Experience with id " + id + " not found"));
        experienceRepository.deleteById(id);
    }
}
