# Stage 1: Build the React application
FROM node:18 as build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:stable-alpine

# Copy the build folder from the 'build' stage to the nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]