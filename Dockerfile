# Base image
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . ./

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the application port
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
