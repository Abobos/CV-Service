FROM node:18-alpine3.16 

RUN apk update && apk add --no-cache \
    git \
    openssh-client \
    wget \
    curl \
    unzip \
    python3 \
    make \
    g++ \
    chromium \
    harfbuzz \
    nss \
    freetype \
    freetype-dev \
    ttf-freefont \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY ["tsconfig.json", "package.json", "yarn.lock", "./"]

RUN yarn install --pure-lockfile --non-interactive

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["node", "dist/server.js"]