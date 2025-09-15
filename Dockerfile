FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS dokploy
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# Copy only the necessary files
COPY --from=dokploy /app/public ./public 
COPY --from=dokploy --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=dokploy --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
CMD ["pnpm", "start"]