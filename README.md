# 🚀 Full Stack DevOps Production Pipeline

A complete end-to-end DevOps project demonstrating how a full-stack application can be automatically built, containerized, deployed, and secured in a cloud production environment.

This project implements a complete CI/CD workflow:

**Code Push → Automated Build → Docker Image → Cloud Deployment → HTTPS Production Service**

The goal of this project was to simulate a real-world DevOps deployment environment while practicing cloud infrastructure, automation, containerization, and deployment engineering.

---

# 🏗️ High-Level Architecture

```
                         User
                           |
                           |
                    HTTPS Request
                           |
                           |
             thesavage.ignorelist.com
                           |
                           |
                 Nginx Reverse Proxy
                           |
                           |
                  Docker Container
                           |
                           |
              Flask Backend Application
                           |
                           |
                    AWS EC2 Instance
                           |
                           |
                   Docker Image Pull
                           |
                           |
                    Docker Hub Registry
                           ^
                           |
                           |
                    GitHub Actions CI/CD
                           ^
                           |
                           |
                    GitHub Repository
```

---

# ✨ Project Features

## Full Stack Application

The application consists of:

### Frontend

Built using:

* HTML
* CSS
* JavaScript

Features include:

* Responsive user interface
* Dynamic content rendering
* Infrastructure information display
* Live status information

---

### Backend

Built using:

* Python Flask

Implemented:

* Flask web server
* Backend routes
* JSON API endpoints
* Health monitoring endpoint
* System information endpoint

Example endpoints:

```
/health
/info
```

The backend is containerized and deployed through Docker.

---

# ☁️ AWS Cloud Infrastructure

The entire cloud environment was provisioned using Infrastructure as Code.

## Terraform Implementation

Terraform was used to automate AWS infrastructure creation.

Created resources:

* AWS VPC
* Public Subnet
* Internet Gateway
* Route Table
* Security Group
* EC2 Instance
* Elastic IP Address

Infrastructure flow:

```
Terraform Code
       |
       |
       v
AWS Provider
       |
       |
       v
Cloud Infrastructure
```

This allows the environment to be recreated consistently without manual configuration.

---

# 🐳 Docker Containerization

The Flask application was containerized using Docker.

Implemented:

* Dockerfile creation
* Image building
* Container execution
* Port mapping
* Container lifecycle management

Application workflow:

```
Application Code
        |
        |
        v
Dockerfile
        |
        |
        v
Docker Image
        |
        |
        v
Docker Container
```

---

# 📦 Docker Hub Integration

Docker Hub was used as the container image registry.

Deployment process:

```
Developer Push
      |
      |
GitHub Actions
      |
      |
Build Docker Image
      |
      |
Push Image
      |
      |
Docker Hub Repository
```

The EC2 server pulls the latest image from Docker Hub during deployment.

---

# 🔄 CI/CD Pipeline

Implemented automated deployment using GitHub Actions.

Every push to the main branch triggers:

```
GitHub Push
      |
      |
GitHub Actions Runner
      |
      |
Build Application
      |
      |
Create Docker Image
      |
      |
Push Image To Docker Hub
      |
      |
Connect To EC2
      |
      |
Pull Latest Image
      |
      |
Restart Application Container
```

The deployment process is fully automated.

No manual SSH deployment is required after code changes.

---

# 🖥️ EC2 Production Deployment

The application runs on:

* AWS EC2
* Ubuntu Linux
* Docker Engine

The server automatically:

1. Pulls the latest Docker image
2. Stops the old container
3. Starts the new version
4. Makes the updated application available

---

# 🌐 Nginx Reverse Proxy

Nginx was configured as the production entry point.

Responsibilities:

* Receive incoming web traffic
* Forward requests to Flask container
* Handle HTTP/HTTPS traffic
* Manage SSL certificates

Architecture:

```
Client

   |
   |

Nginx :80 / :443

   |
   |

Flask Docker Container
```

---

# 🔐 HTTPS Deployment

The application was successfully secured using:

* Let's Encrypt
* Certbot
* Nginx SSL configuration

Implemented:

✅ SSL certificate generation
✅ HTTPS configuration
✅ HTTP to HTTPS redirection
✅ Secure encrypted communication

Production URL:

```
https://thesavage.ignorelist.com
```

The application is now running securely with a trusted SSL certificate.

---

# 🛠️ Technology Stack

| Category               | Technology              |
| ---------------------- | ----------------------- |
| Cloud Provider         | AWS                     |
| Infrastructure as Code | Terraform               |
| Operating System       | Ubuntu Linux            |
| Frontend               | HTML, CSS, JavaScript   |
| Backend                | Python Flask            |
| Containerization       | Docker                  |
| Container Registry     | Docker Hub              |
| CI/CD                  | GitHub Actions          |
| Web Server             | Nginx                   |
| SSL                    | Let's Encrypt + Certbot |
| Version Control        | Git + GitHub            |

---

# 📚 DevOps Concepts Practiced

Through this project, I implemented:

✅ Cloud infrastructure provisioning
✅ Infrastructure as Code
✅ Linux server management
✅ SSH remote administration
✅ Docker containerization
✅ Container registry management
✅ CI/CD automation
✅ Reverse proxy configuration
✅ DNS configuration
✅ SSL/TLS deployment
✅ Production HTTPS hosting
✅ Automated application delivery

---

# 🚀 Deployment Workflow

The complete lifecycle:

```
1. Developer writes code

          ↓

2. Push changes to GitHub

          ↓

3. GitHub Actions starts pipeline

          ↓

4. Application is built and tested

          ↓

5. Docker image is created

          ↓

6. Image pushed to Docker Hub

          ↓

7. AWS EC2 pulls latest image

          ↓

8. Docker container runs application

          ↓

9. Nginx exposes application publicly

          ↓

10. HTTPS secures the deployment
```

---

# 🎯 Future Improvements

Planned upgrades:

* Kubernetes deployment
* Monitoring with Prometheus and Grafana
* Centralized logging
* Improved zero-downtime deployments
* AWS Load Balancer integration
* More advanced Terraform modules

---

# 🏆 Project Status

## Production Deployment Completed ✅

The application is:

✅ Fully containerized
✅ Hosted on AWS EC2
✅ Automated through CI/CD
✅ Delivered through Docker Hub
✅ Served using Nginx Reverse Proxy
✅ Available through a custom domain
✅ Secured with HTTPS using Let's Encrypt

```
Status: Successfully Deployed 🚀
```