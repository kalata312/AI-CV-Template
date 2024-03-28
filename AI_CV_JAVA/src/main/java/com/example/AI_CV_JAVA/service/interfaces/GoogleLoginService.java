package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.auth.AuthenticationResponse;
import com.example.AI_CV_JAVA.user.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

public interface GoogleLoginService {
    AuthenticationResponse processGoogleToken(String googleToken) throws Exception;

    GoogleIdToken verifyGoogleToken(String googleToken) throws Exception;

    User extractUserFromPayload(Payload payload);
}
