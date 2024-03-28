package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.DTO.UserDTO;
import com.example.AI_CV_JAVA.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("/users/{id}")
    private ResponseEntity<UserDTO> getUserDetails(@PathVariable("id") int id) {
        UserDTO user = userService.getUserById(id);
        ModelMapper mapper = new ModelMapper();
        UserDTO userDto = new UserDTO();
        mapper.map(user, userDto);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }
}
