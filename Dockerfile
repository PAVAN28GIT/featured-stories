FROM node:18

WORKDIR /app

# copy package.json and package.json to current working directory
COPY package*.json ./   

RUN npm install

COPY . .
# to build tailwind css - RUN command will run only once during the image-building process
RUN npm run build 

EXPOSE 3000

# start app
CMD [ "npm" ,"start" ]


# stages in containerizing

# write dockerfile
# build it -> create docker image 
# run the image -> When you run an image using the docker run command, Docker creates an instance of that image, which is called a container.
