FROM node:18

WORKDIR /usr/app/
COPY package.json yarn.lock ./

RUN yarn install
RUN yarn global add @angular/cli

COPY src ./

RUN rm -rf .angular

CMD ng serve --host 0.0.0.0 --watch
