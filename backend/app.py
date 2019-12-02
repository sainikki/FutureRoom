from flask import Flask, jsonify, request
from flask_cors import CORS
from queries import is_available


# Web server
app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/")
def hello():
    # return {'text': 'Hellow, World!'}
    return jsonify({'text': 'Hello, World!'})


@app.route("/result", methods=['POST'])
def get_result():
    data = request.get_json()
    input = data['text']
    date, start_time, end_time, room, no_attendees = input[0], input[1], input[2], input[3], int(
        input[4])
    print(date, start_time, end_time, room, no_attendees)
    result = is_available(date, start_time, end_time, room, no_attendees)
    return (result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
