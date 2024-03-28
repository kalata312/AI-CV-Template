package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.auth.AuthenticationResponse;
import com.example.AI_CV_JAVA.service.impl.GoogleLoginServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GoogleLoginController {

    private final GoogleLoginServiceImpl googleLoginService;

    @PostMapping("/process-google-token")
    public AuthenticationResponse processGoogleToken(@RequestBody String googleToken) {
        return googleLoginService.processGoogleToken(googleToken);
    }
}



