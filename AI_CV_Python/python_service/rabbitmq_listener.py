import pika
import json
import threading
from python_service.ai import handle_cv
import os
import logging
from python_service import app


def convert_message(message):
    return message.decode('utf-8', errors='ignore')

def getBlankfactorEmail(text):
    index = text.find("Blankfactor gmail: ")

    if index != -1:  
        email = text[index + len("Blankfactor gmail: "):].strip()

    return email


def on_message_received(ch, method, properties, body):
    ch.basic_ack(delivery_tag=method.delivery_tag)
    to_string = convert_message(body)
    app.logger.info("Received message: %s", to_string) 
    print("Received message:", to_string)
    email =  getBlankfactorEmail(to_string).strip()
    handle_cv(to_string, email)


def listen_for_message_rabbitmq():
    connection_parameters = pika.ConnectionParameters(
        host='rabbit',
        port=5672,  
        credentials=pika.credentials.PlainCredentials(
            username='admin',  
            password='admin'  
        )
    )
        
    connection = pika.BlockingConnection(connection_parameters)
    channel = connection.channel()
    channel.queue_declare(queue='javaguides', durable=True)
    channel.basic_consume(queue='javaguides', auto_ack=False, on_message_callback=on_message_received)
    print("Start consuming")
    channel.start_consuming()


def start_listening():
    thread = threading.Thread(target=listen_for_message_rabbitmq)
    thread.start()
