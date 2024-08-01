-- Criação do Banco de Dados
CREATE DATABASE recicla365
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Criação da tabela User
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilita a Extensão PostGIS para funcionar com a tabela location (necessário ter o PostGIS instalado)
-- Para instalar o PostGIS siga esse tutorial: https://www.bostongis.com/PrinterFriendly.aspx?content_name=postgis_tut01
CREATE EXTENSION postgis;

-- Criação da tabela Location
CREATE TABLE "Locations" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    locality VARCHAR(255) NOT NULL,
    coordinates POINT NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE
);

