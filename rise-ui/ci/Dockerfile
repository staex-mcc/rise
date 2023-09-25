FROM node:16 AS builder
WORKDIR /app
COPY . /app
RUN rm -rf node_modules && \
    npm install && \
    npm run build

FROM busybox
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/dist /srv/rise-ui
VOLUME /srv/rise-ui
CMD ["/bin/sh"]
LABEL org.opencontainers.image.source=https://github.com/staex-mcc/rise
LABEL org.opencontainers.image.description="RISE UI image"
