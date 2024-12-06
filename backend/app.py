from flask import Flask, request, Blueprint
from routes.routes import tasks_bp
from db.db import init_db
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
    
app.register_blueprint(tasks_bp, url_prefix='/tasks')

with app.app_context():
    init_db()


if __name__ == "__main__":
    app.run(debug=True)