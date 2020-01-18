#Backend dockerfile
FROM ubuntu:18.04

# Install required dependencies
RUN apt-get update && apt-get install -y curl

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

# Update npm to latest
RUN npm install npm@latest -g

# Copy the project into the docker image
COPY . .

# Expose the api endpoint
EXPOSE 4000

# Serve the app
CMD ["npm", "run", "dev"]
