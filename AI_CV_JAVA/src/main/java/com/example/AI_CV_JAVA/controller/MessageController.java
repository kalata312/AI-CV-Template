package com.example.AI_CV_JAVA.controller;


import com.example.AI_CV_JAVA.service.interfaces.PdfConsumerService;
import com.example.AI_CV_JAVA.service.interfaces.PdfPublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class MessageController {
    private final PdfPublisherService producer;
    private final PdfConsumerService consumer;

    @GetMapping("/publish")
    public ResponseEntity<String> sendMessage(@RequestBody String message) {
        producer.sendMessage(message);
        return ResponseEntity.ok("Message sent");
    }
}
