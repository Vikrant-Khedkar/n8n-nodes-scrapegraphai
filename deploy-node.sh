#!/bin/bash
# This script builds your custom node, deploys it to your n8n custom nodes folder,
# kills any running n8n process, and then restarts n8n.
#
# It dynamically determines the target directory based on the "name" field in package.json.
#
# Usage: ./deploy-node.sh
 
# Exit immediately if a command fails.
set -e
# Add verbose mode to see commands being executed
set -x
 
##############################
# Step 0: Get Package Name
##############################
# Use Node.js to extract the package name from package.json.
PACKAGE_NAME=$(node -p "require('./package.json').name")
 
if [ -z "$PACKAGE_NAME" ]; then
  echo "Error: Could not determine package name from package.json."
  exit 1
fi
 
# Set the container target directory
CONTAINER_DIR="/home/node/.n8n/custom/$PACKAGE_NAME"
 
echo "Detected package name: '$PACKAGE_NAME'"
echo "Target deployment directory: '$CONTAINER_DIR'"
 
##############################
# Step 1: Build the Node
##############################
echo "Building the node..."
pnpm run build
 
##############################
# Step 2: Deploy the Build Output
##############################
# Define the source (build output) directory.
SOURCE_DIR="./dist"
 
echo "Deploying build output from '$SOURCE_DIR' to container..."
 
# Start the n8n container if it's not running
docker ps | grep n8n || docker start n8n || docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
 
# Remove previous installation from container
echo "Removing previous installation..."
docker exec -u root n8n rm -rf "$CONTAINER_DIR"
 
# Create a temp directory for deployment
TMP_DIR=$(mktemp -d)
cp -rv "$SOURCE_DIR/"* "$TMP_DIR/"
 
# Copy to the container
echo "Copying to n8n container..."
docker cp "$TMP_DIR/." "n8n:$CONTAINER_DIR"
 
# Fix permissions inside the container
echo "Fixing permissions..."
docker exec -u root n8n chown -R node:node "$CONTAINER_DIR"
docker exec -u root n8n chmod -R 755 "$CONTAINER_DIR"
 
# Clean up temp directory
rm -rf "$TMP_DIR"
 
echo "Deployment complete."
 
##############################
# Step 3: Restart n8n
##############################
echo "Restarting n8n..."
docker container restart n8n
 
# Logging for debugging
docker logs -f n8n