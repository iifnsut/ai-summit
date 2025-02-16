#!/bin/bash

echo "Logging in to Docker Hub..."
docker login

# Load environment variables from .env file at root
export $(grep -v '^#' /home/ubuntu/.env | xargs)

echo "Environment variables loaded successfully."

#Docker login
echo "Logging into Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Pull the Docker image from Docker Hub
docker pull nsutiif/event-website:latest

# Stop and remove any existing container (if it's running)
if [ "$(docker ps -q -f name=todo-app)" ]; then
  docker stop event-website
  docker rm event-website
fi

# Start the Docker container
docker run -d --name event-website -p 3000:3000 nsutiif/event-website:latest