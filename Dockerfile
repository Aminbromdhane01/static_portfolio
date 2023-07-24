# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your three.js app listens on (if using a specific port)
EXPOSE 3000

# Command to start your three.js app in development mode
CMD ["npm", "start", "dev"]
