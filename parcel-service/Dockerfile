FROM node:lts-alpine
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci
ADD ./src ./src
RUN npm run build

FROM minio/mc
RUN mc config host add okteto https://minio-kpatel20538.cloud.okteto.net minio-access-key minio-secret-key
COPY --from=0 /app /app
RUN mc mirror --overwrite /app/dist okteto/static
