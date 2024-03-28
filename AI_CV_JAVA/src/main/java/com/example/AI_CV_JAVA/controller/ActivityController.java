package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.Entity.Activity;
import com.example.AI_CV_JAVA.service.interfaces.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("activity")
@RequiredArgsConstructor
public class ActivityController {
    private final ActivityService activityService;

    @GetMapping("/uploaded")
    public ResponseEntity<List<Activity>> getAllUploadedActivities() {
        List<Activity> uploadedCvs = activityService.getUploadedCvs();
        for (Activity uploadedCv : uploadedCvs) {
            System.out.println(uploadedCv.getId());
        }
        return new ResponseEntity<>(uploadedCvs, HttpStatus.OK);
    }

    @GetMapping("/searched")
    public ResponseEntity<List<Activity>> getAllSearchedActivities() {
        List<Activity> searchedCvs = activityService.getSearchedCvs();
        return new ResponseEntity<>(searchedCvs, HttpStatus.OK);
    }
}
