#!/bin/bash


# Pull the Docker image from Docker Hub
docker pull nsutiif/event-website:latest

# Stop and remove any existing container (if it's running)
if [ "$(docker ps -q -f name=todo-app)" ]; then
  docker stop event-website
  docker rm event-website
fi

# Start the Docker container
docker run -d --name event-website -p 3000:3000 nsutiif/event-website:latest