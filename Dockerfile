# Step 1: Use the official Node.js image from Docker Hub
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and dependencies to the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Load environment variables securely (if using build args)
ARG ENV_FILE=.env
COPY $ENV_FILE .env

# Step 7: Build the Next.js app
RUN npm run build

# Step 8: Use a smaller base image for the production environment
FROM node:18-alpine AS runner

# Step 9: Set working directory
WORKDIR /usr/src/app

# Step 10: Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# Step 11: Expose the port Next.js runs on
EXPOSE 3000

# Step 12: Set environment variable for production mode
ENV NODE_ENV=production

# Step 13: Define the command to run the app
CMD ["npm", "start"]
