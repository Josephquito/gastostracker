FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3006

CMD ["node", "--import", "tsx/esm", "src/index.ts"]