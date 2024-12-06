import sqlite3

def init_db():
    conn = sqlite3.connect("mi_base.db")
    cursor = conn.cursor()
    # Crear tabla de tareas si no existe
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            done BOOLEAN NOT NULL DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()

# Función para obtener la conexión a la base de datos
def get_db_connection():
    conn = sqlite3.connect("mi_base.db")
    conn.row_factory = sqlite3.Row  # Para retornar los resultados como diccionarios
    return conn
