FROM node:22-slim

WORKDIR /src

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT
ARG MONGO_URI
ARG KAFKA_URI

ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV KAFKA_URI=${KAFKA_URI}

RUN npm run build

CMD ["npm", "run", "start"]

