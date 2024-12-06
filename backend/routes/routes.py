from flask import Blueprint, request

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route('/', methods=["GET"])
def get_tasks():
    return 'task'