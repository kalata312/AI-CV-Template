package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Experience;

import java.util.List;

public interface ExperienceService {

    Experience saveExperience(Experience experience);

    List<Experience> getAllExperience();

    Experience getExperienceById(Long id);

    Experience updateExperience(Long id, Experience toUpdate);

    void deleteExperience(Long id);


}
