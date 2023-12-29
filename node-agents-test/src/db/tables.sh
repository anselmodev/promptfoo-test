#!/bin/bash

# Define as credenciais do banco de dados
DB_NAME="prompts"
DB_USER="postgres"
DB_PASS="postgres"

# Comando para conectar ao banco de dados PostgreSQL
PSQL="psql -U $DB_USER -d $DB_NAME"

# Cria as tabelas
$PSQL <<EOF

CREATE TABLE IF NOT EXISTS prompts (
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS vars (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL
);

EOF
