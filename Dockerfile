FROM node:lts-bullseye-slim
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app/node_modules
WORKDIR /home/node/app/
COPY ./package*.json /home/node/app/
RUN npm install
COPY ./src /home/node/app/src/
EXPOSE 3000
CMD ["npm","run","start"]
