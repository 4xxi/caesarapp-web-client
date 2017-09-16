FROM node:alpine
USER node
WORKDIR /home/node

# Run in production mode
ENV NODE_ENV=production


# Install app dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn install

# Bundle app source
COPY . .

# Setup environment variables
ENV HOST=0.0.0.0
ENV PORT=4000

EXPOSE 4000

ENTRYPOINT ./entrypoint.sh
