# base image
FROM node:20-alpine  

# Create app directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy app source code
COPY . .

# expose port 3000
EXPOSE 3000

# start app
CMD ["npm", "start"]
