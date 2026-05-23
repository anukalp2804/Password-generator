from flask import Flask, render_template, request, jsonify
import random
import string
import secrets

app = Flask(__name__)


def generate_strong_password(length):
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    numbers = string.digits
    symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/"

    all_chars = lowercase + uppercase + numbers + symbols

    password = [
        secrets.choice(lowercase),
        secrets.choice(uppercase),
        secrets.choice(numbers),
        secrets.choice(symbols)
    ]

    for _ in range(length - 4):
        password.append(secrets.choice(all_chars))

    random.shuffle(password)

    return ''.join(password)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    length = int(data.get('length', 16))

    password = generate_strong_password(length)

    return jsonify({
        'password': password
    })


if __name__ == '__main__':
    app.run(debug=True)