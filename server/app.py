from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('connect')
def connect(auth):
    print(auth)

@socketio.on('move')
def move(data):
    print(data)

if __name__ == '__main__':
    socketio.run(app)

