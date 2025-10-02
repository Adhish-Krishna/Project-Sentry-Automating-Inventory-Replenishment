FROM node:22-slim

WORKDIR /src

COPY . .

RUN npm install

ARG PORT
ARG MONGO_URI

ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}

RUN npm run build

CMD ["npm","run", "start"]

