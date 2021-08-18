FROM node:16.6.2 AS base
WORKDIR /application
COPY package.json /application/

# developmentDependencies
FROM base AS development_dependencies
WORKDIR /application
RUN npm install --loglevel=error

# development
FROM development_dependencies AS development
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ARG PORT=8080
ENV PORT $PORT

COPY --from=development_dependencies /application/node_modules /application/node_modules
WORKDIR /application 
CMD ["npm", "run", "local"]