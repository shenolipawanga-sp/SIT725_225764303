# Study Buddy AI - application image
#
# Debian slim base rather than Alpine: bcrypt is a native module and the
# prebuilt binaries it fetches are compiled against glibc, so installing it
# on Alpine's musl libc needs a full build toolchain in the image.
FROM node:20-bookworm-slim

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Manifests first, so this layer stays cached unless the lockfile changes
COPY package*.json ./

# npm ci installs the exact tree from package-lock.json, production deps only
RUN npm ci --omit=dev

# Application source
COPY . .

# Run as the unprivileged user that ships with the base image
USER node

EXPOSE 3000

CMD ["node", "server.js"]