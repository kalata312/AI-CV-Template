package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Education;
import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Entity.Technology;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PdfService {

    List<Experience> mapExperiences(JsonNode experiencesNode);

    Person makePerson(String jsonMessage) throws Exception;

    List<Education> mapEducation(JsonNode education);

    List<Technology> mapTechnologies(JsonNode technologiesNode);

    void readJson(String message) throws Exception;

    void upload(MultipartFile file, String gmail) throws IOException;
}
