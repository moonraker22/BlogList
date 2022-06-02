FROM Node:8.11.1-alpine

WORKDIR /app

COPY package.json /package.json
COPY package-lock.json /package-lock.json

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
