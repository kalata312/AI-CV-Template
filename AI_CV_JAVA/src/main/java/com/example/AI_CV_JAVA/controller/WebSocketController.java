package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.DTO.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody NotificationDto notificationDto) {
        template.convertAndSend("/topic/message", notificationDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @SendTo("/topic/message")
    public NotificationDto broadcastMessage(@Payload NotificationDto notificationDto) {
        return notificationDto;
    }
}
