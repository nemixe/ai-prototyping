FROM node:20.12.1-alpine AS build

ENV PORT=8080
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN apk add git

RUN npm install -g pnpm@8.14.1 && pnpm install

COPY . .

RUN pnpm lint

RUN pnpm build

FROM nginx:alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf

ENV PORT=8080

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
