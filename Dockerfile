# base
FROM node:18.13.0 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# for build
FROM base as builder
WORKDIR /usr/src/app
RUN npm run build

# for production
FROM node:18.13.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/build ./
COPY --from=builder /usr/src/app/.env ./
RUN adduser -D nodeUser && chown -R nodeUser /usr/src/app
USER nodeUser
EXPOSE 3000
ENTRYPOINT ["node","./index.js"]
