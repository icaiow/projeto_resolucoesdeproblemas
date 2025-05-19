#!/bin/sh
set -e

echo "=== Iniciando configuração do Nginx ==="

# Verificar se o arquivo existe
if [ ! -f /etc/nginx/conf.d/default.conf ]; then
    echo "ERRO: Arquivo nginx.conf não encontrado!"
    exit 1
fi

# Mostrar conteúdo original
echo "=== Conteúdo original do nginx.conf ==="
cat /etc/nginx/conf.d/default.conf

# Substituir a URL do backend no nginx.conf
echo "=== Substituindo URL do backend ==="
sed -i "s|proxy_pass.*|proxy_pass https://nohate-backend-production.up.railway.app;|" /etc/nginx/conf.d/default.conf

# Mostrar conteúdo após substituição
echo "=== Conteúdo após substituição ==="
cat /etc/nginx/conf.d/default.conf

# Testar configuração do nginx
echo "=== Testando configuração do Nginx ==="
nginx -t

echo "=== Iniciando Nginx ==="
exec nginx -g 'daemon off;' 