# the application container
FROM node:alpine
COPY --from=4xxi/caesarapp-web-client:code /var/www/app /var/www/app
WORKDIR /var/www/app

# Setup environment variables
ENV HOST=0.0.0.0
ENV PORT=4000

EXPOSE 4000

CMD [ "yarn", "run", "prod"]
