package com.example.AI_CV_JAVA.DTO;

import lombok.Data;

import java.util.List;

@Data
public class PersonDto {
    private String name;
    private String summary;
    private List<TechnologyDto> technologies;
    private List<ExperienceDto> experience;
    private List<EducationDto> education;
}
