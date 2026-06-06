FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma/ ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3006

CMD ["node", "--import", "tsx/esm", "src/index.ts"]