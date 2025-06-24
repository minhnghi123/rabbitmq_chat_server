# base image: nginx from docker hub
FROM nginx:latest 

# remove the default nginx.conf file because i wanna use my own nginx.conf
RUN rm /etc/nginx/nginx.conf

# then let copy and paste , replace it into the container
COPY nginx.conf /etc/nginx/nginx.conf