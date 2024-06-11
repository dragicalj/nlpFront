# Use the official Node.js 20.9 image as the base image
FROM node:20.9

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . /app/

# Build the React application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3306

# Start the application
CMD ["npm", "start"]
