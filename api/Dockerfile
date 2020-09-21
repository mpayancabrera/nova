FROM node:12.18-alpine AS base
ENV PROJECT_DIR=/home/node/app
USER node
RUN mkdir -p $PROJECT_DIR
WORKDIR $PROJECT_DIR

CMD ["npm", "run", "dev"]
