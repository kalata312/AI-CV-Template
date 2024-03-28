package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Activity;
import com.example.AI_CV_JAVA.Entity.Enum.Type;
import com.example.AI_CV_JAVA.Repo.ActivityRepository;
import com.example.AI_CV_JAVA.service.interfaces.ActivityService;
import com.example.AI_CV_JAVA.service.interfaces.UserService;
import com.example.AI_CV_JAVA.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;
    private final UserService userService;


    @Override
    public List<Activity> getUploadedCvs() {
        User currentUser = userService.getCurrentUser();
        List<Activity> activities = userService.getCurrentUser().getActivities();
        return userService.getCurrentUser().getActivities().stream().filter(a -> a.getType().equals(Type.Uploaded)).toList();

    }

    @Override
    public List<Activity> getSearchedCvs() {
        List<Activity> activities = userService.getCurrentUser().getActivities();
        return userService.getCurrentUser().getActivities().stream().filter(a -> a.getType().equals(Type.Searched)).toList();
    }

    @Override
    public Activity crteateActivity(User user, String person, Type type) {
        Activity activity = new Activity();
        activity.setPersonEmail(person);
        activity.setType(type);
        activity.setCreatedDate(Instant.now());
        return activityRepository.saveAndFlush(activity);
    }
}
