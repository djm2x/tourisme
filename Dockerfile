FROM node:16-alpine3.14 as build-env

ARG CONFIGURATION='production'

# Make /app as working directory
WORKDIR /app

RUN date
# Copy package.json file
COPY package.json .
COPY package-lock.json .
# Copy the source code to the /app directory
RUN npm ci --force
# RUN npm i --force

# RUN date
# RUN ./node_modules/.bin/ngcc --properties es2015

RUN date
# Copy the source code to the /app directory
COPY . .
# Build the application
# RUN npm run prod --  --output-path=dist --configuration=$CONFIGURATION 
RUN npm run zip

RUN date
RUN ls -al

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx website
RUN rm -rf ./*

# Copy nginx config file
COPY ngx.conf /etc/nginx/conf.d/default.conf

# Copy dist folder fro build stage to nginx public folder
COPY --from=build-env /app/dist ./
# COPY ./dist .

# Start NgInx service
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
