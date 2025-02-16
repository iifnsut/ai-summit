#!/bin/bash

# Update package manager
sudo apt-get update

# Install Docker if not installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Installing Docker..."
  sudo apt-get install -y docker.io
fi

# Ensure Docker is running
sudo systemctl start docker
sudo systemctl enable docker