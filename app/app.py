from flask import Flask, jsonify
import socket
import datetime
import os

app = Flask(__name__)

APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
ENVIRONMENT = os.getenv("ENVIRONMENT", "production")

@app.route("/")
def home():
    return f"""
    <h1>🚀 DevOps Pipeline Project</h1>
    <hr>
    <p><strong>Hostname:</strong> {socket.gethostname()}</p>
    <p><strong>Current Time (UTC):</strong> {datetime.datetime.utcnow()}</p>
    <p><strong>Version:</strong> {APP_VERSION}</p>
    <p><strong>Environment:</strong> {ENVIRONMENT}</p>
    """

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": str(datetime.datetime.utcnow())
    })

@app.route("/info")
def info():
    return jsonify({
        "hostname": socket.gethostname(),
        "version": APP_VERSION,
        "environment": ENVIRONMENT,
        "time": str(datetime.datetime.utcnow())
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)