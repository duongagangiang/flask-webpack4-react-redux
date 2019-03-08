import pymysql
import json
from flask import jsonify, make_response, Response, json, session
from flask_bcrypt import check_password_hash
from app import app
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

bcrypt = Bcrypt(app)


class Database:

    def __init__(self):
        host = "localhost"
        user = "root"
        password = ""
        db = "blog"

        self.conn = pymysql.connect(host=host,
                                    user=user,
                                    password=password,
                                    db=db)
        self.cursor = self.conn.cursor()
    
    def get_users(self):
        self.cursor.execute("select * from users")
        result = self.cursor.fetchall()
        users = list()
        for user in result:
            new_user = {
                "id": user[0],
                "email": user[1],
                "display_name": user[2],
                "username": user[3],
                "password": user[4],
                "role": user[5],
                "active": user[6] 
            }
            users.append(new_user)
        return users

    def check_user_by_email(self, email, password):
        self.cursor.execute("select * from users where email=%s", [email])
        res = self.cursor.fetchone()
        result = ""
        if res:
            if bcrypt.check_password_hash(res[3], password):
                new_user = {
                    "id": res[0],
                    "email": res[1],
                    "username": res[2],
                    "password": res[3],
                    "role": res[4],
                    "active": res[5]
                }
                result = {"res_success": new_user}
        else:
            result = {"res_error": "Invalid Credential"}
        return result
    
    def add_user(self, user):
        new_user = (str(user["email"]), str(user["displayName"]), str(user["password"]), str(user["role"]), str(user["active"]), str(user["created_at"]))
        query = "INSERT INTO users(email, display_name, password, role, active, created_at) VALUES (%s, %s, %s, %s, %s, %s)"
        self.cursor.execute(query, new_user)
        self.conn.commit()
        res = self.cursor.rowcount
        if res:          
            return jsonify(json.dumps({"message": "Add user successfully"})), 200
        else:
            return jsonify({"message": "Error"}), 500

    def update_user(self, user):
        user.update({
            "id": int(user["id"]),
            "role": int(user["role"])
        })
        query = "UPDATE users SET display_name='{1}', password='{2}', role={3} WHERE id={0}".format(user["id"], user["display_name"], user["password"], user["role"])
        self.cursor.execute(query)
        self.conn.commit()
        res = self.cursor.rowcount
        if res:
            return jsonify(json.dumps({"message": "Update user successfully"})), 200
        else:
            return jsonify({"message": "Error"}), 500    