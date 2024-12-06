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

@tasks_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (id,))
    conn.commit()
    
    if cursor.rowcount == 0:  # Si no se eliminó ninguna fila
        conn.close()
        return jsonify({"error": "No se encontró una tarea con ese ID"}), 404
    
    conn.close()
    return jsonify({"message": "Tarea eliminada"}), 200
