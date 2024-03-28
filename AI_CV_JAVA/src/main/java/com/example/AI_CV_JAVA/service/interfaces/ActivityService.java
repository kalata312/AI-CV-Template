package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Activity;
import com.example.AI_CV_JAVA.Entity.Enum.Type;
import com.example.AI_CV_JAVA.user.User;

import java.util.List;

public interface ActivityService {
    List<Activity> getUploadedCvs();

    List<Activity> getSearchedCvs();

    Activity crteateActivity(User user, String person, Type type);
}
