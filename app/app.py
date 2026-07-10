from flask import Flask, jsonify, render_template
import socket
import os
import platform
from datetime import datetime
from zoneinfo import ZoneInfo

app = Flask(__name__)

APP_VERSION = os.getenv("APP_VERSION", "2.0.0")
ENVIRONMENT = os.getenv("ENVIRONMENT", "Production")


@app.route("/")
def home():

    egypt_time = datetime.now(
        ZoneInfo("Africa/Cairo")
    ).strftime("%Y-%m-%d %H:%M:%S")

    return render_template(
        "index.html",
        hostname=socket.gethostname(),
        version=APP_VERSION,
        environment=ENVIRONMENT,
        current_time=egypt_time,
        python_version=platform.python_version(),
        operating_system=platform.system(),
    )


@app.route("/health")
def health():

    return jsonify({
        "status": "Healthy",
        "time": datetime.now(
            ZoneInfo("Africa/Cairo")
        ).strftime("%Y-%m-%d %H:%M:%S")
    })


@app.route("/info")
def info():

    return jsonify({
        "hostname": socket.gethostname(),
        "environment": ENVIRONMENT,
        "version": APP_VERSION,
        "python": platform.python_version(),
        "os": platform.system(),
        "time": datetime.now(
            ZoneInfo("Africa/Cairo")
        ).strftime("%Y-%m-%d %H:%M:%S")
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)