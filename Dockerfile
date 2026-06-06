FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

RUN npm install
RUN npx prisma generate

EXPOSE 3006

CMD ["node", "--import", "tsx/esm", "src/index.ts"]