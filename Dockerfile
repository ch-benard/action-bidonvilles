# # develop stage
# FROM node:14-alpine as develop-stage
# WORKDIR /app
# COPY package*.json ./
# RUN yarn install
# COPY . .

# # build stage
# FROM develop-stage as build-stage
# RUN yarn build-staging
# # Remplacer ci-dessous x.x.x par le numéro de la release
# RUN yarn release ${FRONT_RELEASE}

# production stage
FROM nginx:mainline-alpine as production-stage
WORKDIR /var/www/html
#COPY --from=build-stage /app/dist /var/www/html
COPY dist/* ./
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]