FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Stage build
FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Stage final para producción
FROM base AS production
WORKDIR /app

# Copiamos package.json + lockfile
COPY package.json pnpm-lock.yaml ./

# Copiamos node_modules y build desde stage build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/.next/ ./.next

EXPOSE 3000
CMD ["pnpm", "start"]
