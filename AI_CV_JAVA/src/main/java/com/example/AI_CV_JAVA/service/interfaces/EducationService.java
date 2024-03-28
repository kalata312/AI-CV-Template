package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Education;

import java.util.List;

public interface EducationService {

    Education saveEducation(Education education, long personId);

    List<Education> getAllEducations();

    Education getEducationById(Long id);

    Education updateEducation(Long id, Education toUpdate);

    void deleteEducation(Long id);


}
