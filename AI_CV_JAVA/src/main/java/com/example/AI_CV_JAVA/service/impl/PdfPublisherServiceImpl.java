package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.service.interfaces.PdfPublisherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PdfPublisherServiceImpl implements PdfPublisherService {

    private final AmqpTemplate rabbitTemplate;
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    @Override
    public void sendMessage(String pdf) {
        log.info("MESSAGE SENT");
        rabbitTemplate.convertAndSend(exchange, routingKey, pdf);
    }
}
