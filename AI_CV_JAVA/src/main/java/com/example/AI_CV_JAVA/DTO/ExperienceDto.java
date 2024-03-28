package com.example.AI_CV_JAVA.DTO;

import lombok.Data;

@Data
public class ExperienceDto {
    private long id;
    private String companyName;
    private String role;
    private String startYear;
    private String endYear;
    private String description;
}