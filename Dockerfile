FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY . .

RUN bun install

CMD ["bun", "run", "main.ts"]
