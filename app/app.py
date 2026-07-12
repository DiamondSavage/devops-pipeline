from flask import Flask, render_template, jsonify
from datetime import datetime
from zoneinfo import ZoneInfo

import socket
import platform
import os
import time

app = Flask(__name__)

START_TIME = time.time()


# ============================================
# Helper Functions
# ============================================

def uptime():

    seconds = int(time.time() - START_TIME)

    days = seconds // 86400
    seconds %= 86400

    hours = seconds // 3600
    seconds %= 3600

    minutes = seconds // 60
    seconds %= 60

    return f"{days}d {hours}h {minutes}m {seconds}s"


def cpu_count():

    return os.cpu_count()


def hostname():

    return socket.gethostname()


def os_name():

    return platform.system() + " " + platform.release()


def python_version():

    return platform.python_version()


def current_time():

    return datetime.now(
        ZoneInfo("Africa/Cairo")
    ).strftime("%A, %d %B %Y %H:%M:%S")


# ============================================
# Home
# ============================================

@app.route("/")
def home():

    return render_template(

        "index.html",

        hostname=hostname(),

        operating_system=os_name(),

        python_version=python_version(),

        current_time=current_time(),

        environment=os.getenv(
            "ENVIRONMENT",
            "Production"
        ),

        version=os.getenv(
            "APP_VERSION",
            "v3.0.0"
        ),

        cpu=cpu_count(),

        uptime=uptime()

    )


# ============================================
# Health
# ============================================

@app.route("/health")
def health():

    return jsonify(

        status="Healthy",

        service="DevOps Production Platform",

        version=os.getenv(
            "APP_VERSION",
            "v3.0.0"
        ),

        environment=os.getenv(
            "ENVIRONMENT",
            "Production"
        ),

        hostname=hostname(),

        uptime=uptime(),

        current_time=current_time()

    )


# ============================================
# API INFO
# ============================================

@app.route("/api/info")
def info():

    return jsonify(

        hostname=hostname(),

        operating_system=os_name(),

        python_version=python_version(),

        cpu_cores=cpu_count(),

        environment=os.getenv(
            "ENVIRONMENT",
            "Production"
        ),

        version=os.getenv(
            "APP_VERSION",
            "v3.0.0"
        ),

        uptime=uptime(),

        current_time=current_time(),

        technologies=[

            "Linux",

            "Networking",

            "Git",

            "GitHub",

            "Docker",

            "Docker Compose",

            "GitHub Actions",

            "Terraform",

            "AWS",

            "EC2",

            "Nginx",

            "Flask",

            "Kubernetes",

            "Prometheus",

            "Grafana"

        ]

    )


# ============================================
# Future Metrics Endpoint
# ============================================

@app.route("/metrics")
def metrics():

    return jsonify(

        prometheus="Coming Soon",

        grafana="Connected Later",

        kubernetes="Cluster Ready",

        monitoring="Enabled"

    )


# ============================================
# About
# ============================================

@app.route("/about")
def about():

    return jsonify(

        project="DevOps Production Platform",

        author="Abdallah Hegazy",

        description="""
Complete DevOps portfolio project
built from scratch using Linux,
Docker, GitHub Actions,
Terraform, AWS, Nginx,
Flask, Kubernetes,
Prometheus and Grafana.
""",

        github="YOUR_GITHUB_URL",

        dockerhub="https://hub.docker.com/r/abdallahhegazy/devops-pipeline"

    )


# ============================================
# Start
# ============================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=False

    )