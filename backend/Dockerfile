FROM node:18-alpine

WORKDIR /app

# Instalar dependências necessárias incluindo OpenSSL
RUN apk add --no-cache \
    openssl \
    openssl-dev \
    python3 \
    make \
    g++ \
    libc6-compat

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Gerar tipos do Prisma
RUN npx prisma generate

EXPOSE 3000

ENV NODE_ENV=development
ENV PORT=3000

CMD ["npm", "run", "dev"] 