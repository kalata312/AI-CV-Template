package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.service.interfaces.PdfConsumerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PdfConsumerServiceImpl implements PdfConsumerService {

    private final PdfServiceImpl pdfService;

    @Override
    @RabbitListener(queues = "${rabbitmq.queue.listener}")
    public void consume(String message) throws Exception {
        log.info(String.format("Received message -> %s", message));
        pdfService.readJson(message);
    }
}
