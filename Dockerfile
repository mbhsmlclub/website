FROM node:latest
WORKDIR /app 
COPY package.json /app 
COPY yarn.lock /app
RUN yarn install 
COPY . /app 
CMD yarn build
CMD npx serve build -p 8072
EXPOSE 8072