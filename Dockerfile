FROM node:8

# Create app directory
WORKDIR /Users/monojitdattams/Projects/KubernetesTestApp/

COPY package*.json /Users/monojitdattams/Projects/KubernetesTestApp/

RUN npm install --unsafe-perm

COPY . /Users/monojitdattams/Projects/KubernetesTestApp/

EXPOSE 7007

CMD npm start