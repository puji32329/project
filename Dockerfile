# Use nginx to serve the built files
FROM nginx:alpine

# Set working directory inside container
WORKDIR /usr/share/nginx/html

# Copy the prebuilt dist folder from your local machine
COPY dist /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
