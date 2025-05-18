# Use official Node base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]
