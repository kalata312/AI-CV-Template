package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Repo.UserRepository;
import com.example.AI_CV_JAVA.auth.AuthenticationResponse;
import com.example.AI_CV_JAVA.security.JwtService;
import com.example.AI_CV_JAVA.service.interfaces.GoogleLoginService;
import com.example.AI_CV_JAVA.user.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoogleLoginServiceImpl implements GoogleLoginService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public AuthenticationResponse processGoogleToken(String googleToken) {
        try {
            GoogleIdToken idToken = verifyGoogleToken(googleToken);
            GoogleIdToken.Payload payload = idToken.getPayload();
            User user = extractUserFromPayload(payload);

            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                User oldUser = existingUser.get();
                String jwtNew = jwtService.generateToken(oldUser);
                return AuthenticationResponse.builder()
                        .token(jwtNew)
                        .build();
            }

            userRepository.save(user);
            String jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return AuthenticationResponse.builder()
                    .error("Error processing Google Id token")
                    .build();
        }
    }

    @Override
    public GoogleIdToken verifyGoogleToken(String googleToken) throws Exception {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        NetHttpTransport transport = new NetHttpTransport();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList("882008211267-hm9q7m1g6ogig1j1nj1kug0tju1a96i4.apps.googleusercontent.com"))
                .build();

        return verifier.verify(googleToken);
    }

    @Override
    public User extractUserFromPayload(GoogleIdToken.Payload payload) {
        String email = payload.getEmail();
        String givenName = (String) payload.get("given_name");
        String familyName = (String) payload.get("family_name");
        String pictureUrl = (String) payload.get("picture");

        User user = new User();
        user.setFirstname(givenName);
        user.setLastname(familyName);
        user.setPictureUrl(pictureUrl);
        user.setEmail(email);

        return user;
    }
}
