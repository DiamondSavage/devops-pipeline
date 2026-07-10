terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "production"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "production-route-table"
  }
}

resource "aws_subnet" "subnet1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-west-2c"
  map_public_ip_on_launch = true

  tags = {
    Name = "prod-subnet"
  }
}

resource "aws_route_table_association" "main" {
  subnet_id      = aws_subnet.subnet1.id
  route_table_id = aws_route_table.main.id
}

resource "aws_security_group" "allow_web" {
  name        = "allow-web"
  description = "Allow HTTP HTTPS and SSH"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow-web"
  }
}

resource "aws_eip" "web" {
  instance = aws_instance.web.id
  domain   = "vpc"
}

resource "aws_instance" "web" {
  ami                         = "ami-0224ce6f9504665ee"
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.subnet1.id
  availability_zone           = "eu-west-2c"
  vpc_security_group_ids      = [aws_security_group.allow_web.id]
  associate_public_ip_address = true
  key_name                    = "main-key"

  user_data = <<-EOF
#!/bin/bash

apt update -y
apt install docker.io -y

systemctl enable docker
systemctl start docker

apt install nginx -y

systemctl enable nginx
systemctl start nginx

docker pull abdallahhegazy/devops-pipeline:latest

docker run -d \
  --name flask \
  --restart unless-stopped \
  -p 5000:5000 \
  -e APP_VERSION=1.0.0 \
  -e ENVIRONMENT=production \
  abdallahhegazy/devops-pipeline:latest

cat > /etc/nginx/sites-available/default << 'NGINXCONF'
server {
    listen 80;

    location / {
        proxy_pass http://127.0.0.1:5000;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINXCONF

systemctl restart nginx

EOF

  tags = {
    Name = "web-server"
  }
}

output "public_ip" {
  value = aws_eip.web.public_ip
}