# Use the official Node.js 20.9 image as the base image
FROM node:20.9

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock /app/

# Install project dependencies using Yarn
RUN yarn install

# Output the directory contents to verify installation
RUN ls -la /app
RUN ls -la /app/node_modules
RUN ls -la /app/node_modules/react-scripts

# Copy the rest of the application code to the working directory
COPY . /app/

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]

