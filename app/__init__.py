from flask import Flask

app = Flask(__name__, static_folder='static', template_folder='static/templates', static_url_path="")
app.secret_key = "hoc cach cho di truoc khi nhan lai"
app.debug = True

from app import routes