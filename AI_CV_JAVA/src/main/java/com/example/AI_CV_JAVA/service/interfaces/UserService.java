package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.DTO.UserDTO;
import com.example.AI_CV_JAVA.user.User;

public interface UserService {
    UserDTO getUserById(int id);

    User getCurrentUser();

    void saveUser(User user);
}
