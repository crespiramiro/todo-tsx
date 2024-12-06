from flask import Blueprint, request, jsonify
from db.db import get_db_connection

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route('/', methods=["GET"])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    tasks = [
        {"id": row["id"], "title": row["title"], "description": row["description"], "done": bool(row["done"])}
        for row in rows
    ]
    return jsonify(tasks), 200

@tasks_bp.route("/", methods=["POST"])
def create_task():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description", "")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tasks (title, description) VALUES (?, ?)",
        (title, description),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Tarea creada"}), 201