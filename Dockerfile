# 1. Install dependencies
FROM node:22-alpine3.21 AS deps
WORKDIR /app
RUN apk upgrade --no-cache
COPY package.json package-lock.json ./
RUN npm ci

# 2. Build the app
FROM node:22-alpine3.21 AS builder
WORKDIR /app
RUN apk upgrade --no-cache
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# Build-time env vars that Next.js may need to inline (NEXT_PUBLIC_* only)
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
ARG NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=$NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
ENV NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=$NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

RUN npm run build

# 3. Run the app
FROM node:22-alpine3.21 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Apply latest security patches to base OS packages
RUN apk update && apk upgrade --no-cache

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]