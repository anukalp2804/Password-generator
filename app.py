from flask import Flask, render_template, request, jsonify
import secrets
import string
import random

app = Flask(__name__)


def generate_strong_password(
        length,
        uppercase,
        lowercase,
        numbers,
        symbols
):

    upper = string.ascii_uppercase
    lower = string.ascii_lowercase
    nums = string.digits
    syms = "!@#$%^&*()_+-=[]{}|;:,.<>?/"

    all_chars = ""
    password = []

    if uppercase:
        all_chars += upper
        password.append(secrets.choice(upper))

    if lowercase:
        all_chars += lower
        password.append(secrets.choice(lower))

    if numbers:
        all_chars += nums
        password.append(secrets.choice(nums))

    if symbols:
        all_chars += syms
        password.append(secrets.choice(syms))

    for _ in range(length - len(password)):
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

    uppercase = data.get('uppercase', True)
    lowercase = data.get('lowercase', True)
    numbers = data.get('numbers', True)
    symbols = data.get('symbols', True)

    password = generate_strong_password(
        length,
        uppercase,
        lowercase,
        numbers,
        symbols
    )

    return jsonify({
        "password": password
    })


if __name__ == '__main__':
    app.run(debug=True)