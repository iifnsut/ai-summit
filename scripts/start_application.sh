#!/bin/bash

# Enable script debugging (optional)
set -e  # Exit script on error
set -o pipefail  # Catch pipeline errors

# Load environment variables from .env file at root
echo "Loading environment variables..."
set -a  # Automatically export variables
source /home/ubuntu/.env
set +a  # Stop auto-export

echo "Environment variables loaded successfully."

# Docker login
echo "Logging into Docker Hub..."
echo "$DOCKER_PAT" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Pull the Docker image from Docker Hub
echo "Pulling the latest Docker image..."
docker pull nsutiif/event-website:latest

# Stop and remove any existing container (if it's running)
if [ "$(docker ps -q -f name=event-website)" ]; then
  echo "Stopping existing container..."
  docker stop event-website
  docker rm event-website
fi

# Start the Docker container
echo "Starting new container..."
docker run -d --name event-website  -p 3000:3000 nsutiif/event-website:latest
