### STAGE 1:BUILD ###
FROM node:16.14.2 AS node
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod


### STAGE 2:RUN ###
FROM nginx:latest AS nginx
COPY --from=node /app/dist/loggator-frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
