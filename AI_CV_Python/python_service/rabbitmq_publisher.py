import pika
import json
import logging
from python_service import app


def publish_message_to_rabbitmq(data):
    data_to_string = json.dumps(data)
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
    channel.queue_declare(queue='json.python', durable=True)
    channel.basic_publish(exchange='', routing_key='json.python', body=data_to_string)
    app.logger.info("Send message: %s", data_to_string) 
    print(f"Send message: {data_to_string}")
    connection.close()
