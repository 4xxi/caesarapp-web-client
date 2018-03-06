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

RUN yarn run build

# Setup environment variables
ENV HOST=0.0.0.0
ENV PORT=4000

EXPOSE 4000

CMD [ "yarn", "run", "start"]
