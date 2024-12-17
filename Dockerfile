FROM node:22-alpine3.18 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.6-alpine AS production

EXPOSE 80

COPY --from=development /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
