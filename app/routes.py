from app import app
import json
from flask import render_template, request, jsonify, url_for, session, redirect
from app.database import Database
from datetime import datetime
from flask_cors import CORS
from flask_jwt_extended import JWTManager, decode_token
from flask_bcrypt import Bcrypt


bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


@app.route('/')
@app.route('/index')
def index():
    users = get_users()
    if "current_user" in session:
        current_user = session["current_user"]
        return render_template('index.html', users=users, currentUser=json.dumps(current_user))
    return render_template('index.html', users=users)


@app.route('/administration-page')
def index_administration_page():
    if "current_user" in session:
        current_user = session["current_user"]
        if current_user["role"] == 1:
            return render_template('index.html', currentUser=json.dumps(current_user))
        else:
            return request.referrer
    return redirect(url_for("login"))


@app.route('/get-users', methods=["GET"])
def get_users():
    if request.method == "GET":
        users = get_users()
        return jsonify(users), 200


@app.route('/add_user', methods=["GET", "POST"])
def add_user():
    if request.method == "GET":
        return render_template('add_user.html', action="Add user")
    else:
        email = request.form.get("email", "")
        display_name = request.form.get("display_name", "")
        username = request.form.get("username", "")
        password = request.form.get("password", "")
        role = request.form.get("role", 0)
        user = {
            "email": email,
            "display_name": display_name,
            "username": username,
            "password": password,
            "role": role
        }
        res = add_user(user)
        return render_template('index.html', res=res)


@app.route('/update_user', methods=["GET", "POST"])
def update_user():
    if request.method == "GET":
        return render_template('add_user.html', action="Update user")
    else:
        user_id = request.form.get("id", 0)
        display_name = request.form.get("display_name", "")
        password = request.form.get("password", "")
        role = request.form.get("role", 0)
        user = {
            "id": user_id,
            "display_name": display_name,
            "password": password,
            "role": role
        }
        res = update_user(user)
        return render_template('index.html', res=res)


def get_users():
    db = Database()
    users = db.get_users()
    return users


def check_user_by_email(username, password):
    db = Database()
    message = db.check_user_by_email(username, password)
    return message


def add_user(user):
    db = Database()
    response = db.add_user(user)
    return response


def update_user(user):
    db = Database()
    response = db.update_user(user)
    return response


@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("index.html")
    if request.method == "POST":
        displayName = request.get_json()["displayName"]
        email = request.get_json()["email"]
        password = bcrypt.generate_password_hash(request.get_json()["password"]).decode("utf-8")
        created_at = datetime.utcnow()
        user = {
            "email": email,
            "displayName": displayName,
            "password": password,
            "role": 2,
            "active": 1,
            "created_at": created_at
        }
        res = add_user(user)
        return res


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("index.html")
    if request.method == "POST":
        email = request.get_json()["email"]
        password = request.get_json()["password"]
        res = check_user_by_email(email, password)
        if hasattr(res, "res_success"):
            user = res["res_success"]
            if user["role"] == 1:
                return render_template("administration.html")
            else:
                return render_template("index.html")
        else:
            return jsonify(res), 200


@app.route('/logout', methods=["GET"])
def logout():
    session.pop("username", None)
    return jsonify('Logout'), 200


@app.route('/post', methods=["GET"])
def post():
    if request.method == "GET":
        return render_template("index.html")
