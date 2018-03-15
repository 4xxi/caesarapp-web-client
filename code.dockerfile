FROM node:alpine

# Preparing
RUN mkdir -p /var/www/app
RUN chown -R node /var/www/app
WORKDIR /var/www/app
# Run in production mode
ENV NODE_ENV=production

# Install app dependencies
COPY package.json .
COPY yarn.lock .

# Install deps
RUN yarn install

# Bundle app source
COPY . .

# Build app
#RUN yarn run build --universal
