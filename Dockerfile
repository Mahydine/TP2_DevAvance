FROM node:lts-bullseye-slim
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app/node_modules
WORKDIR /home/node/app/
COPY ./package*.json /home/node/app/
RUN npm install
COPY ./src /home/node/app/src/
ENV MARVEL_API_PUBLIC_KEY a1300ede5d035aa6c05e527046c7f033
ENV MARVEL_API_PRIVATE_KEY 3cc287b8c354657dfbf3f564658b47a6adbf1914
EXPOSE 3000
CMD ["npm","run","start"]
