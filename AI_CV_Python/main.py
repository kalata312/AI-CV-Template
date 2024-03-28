from python_service import app
from python_service.rabbitmq_listener import listen_for_message_rabbitmq, start_listening
from python_service.rabbitmq_publisher import publish_message_to_rabbitmq

@app.route('/')
def home():
    return "Running"

if __name__ == '__main__':
    start_listening()
    app.run(host='0.0.0.0', port=5001)
