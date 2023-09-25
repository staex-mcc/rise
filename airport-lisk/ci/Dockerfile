FROM node:16 AS builder
WORKDIR /app
COPY . /app
RUN rm -rf node_modules && \
    npm install && \
    (npm run build || true)

FROM node:16-slim
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app /app
RUN \
    mkdir -p /var/lib/airport-lisk && \
    chown node:node /var/lib/airport-lisk
USER node
EXPOSE 4005/tcp
EXPOSE 4006/tcp
EXPOSE 12400/tcp
LABEL org.opencontainers.image.source=https://github.com/staex-mcc/rise
LABEL org.opencontainers.image.description="RISE node image"
CMD ["/app/bin/run", "start", "--enable-dashboard-plugin", "--enable-faucet-plugin"]
