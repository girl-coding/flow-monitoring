FROM node:18

RUN mkdir -p /usr/app/my-angular
WORKDIR /usr/app/my-angular
COPY package.json yarn.lock ./

RUN yarn install
RUN yarn global add @angular/cli

COPY src ./

RUN rm -rf .angular

CMD ng serve --host 0.0.0.0 --watch
