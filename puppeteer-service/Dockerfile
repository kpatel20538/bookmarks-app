FROM buildkite/puppeteer

ADD package.json package-lock.json /
RUN npm ci
ADD . .
CMD ["npm", "start"]