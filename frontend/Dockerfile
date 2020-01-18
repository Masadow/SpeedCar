#Frontend dockerfile
FROM ubuntu:18.04

#Specify that we're inside the docker environment
ENV FROM_DOCKER True

# Install required dependencies
RUN apt-get update && apt-get install -y curl

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

# Update npm to latest
RUN npm install npm@latest -g

# Copy the frontend into the docker image
COPY . .

# Install npm packages for the project
RUN npm install -y

# Build the app
RUN npm run build

# Expose the app from the outside world
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "prod"]
