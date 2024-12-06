from flask import Flask, request, Blueprint
from routes.routes import tasks_bp
from db.init import init_db


app = Flask(__name__)
init_db()

app.register_blueprint(tasks_bp, url_prefix='/tasks')


if __name__ == "__main__":
    app.run(debug=True)