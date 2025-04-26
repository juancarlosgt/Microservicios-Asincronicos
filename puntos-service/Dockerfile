
FROM node:20


RUN apt-get update && apt-get install -y python3 g++ make


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3001


CMD ["node", "app.js"]
