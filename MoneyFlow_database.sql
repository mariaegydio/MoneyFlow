CREATE DATABASE MoneyFlow;

CREATE TABLE Usuario (
id_usuario INT PRIMARY KEY NOT NULL,
nome VARCHAR (50),
email VARCHAR (50),
senha VARCHAR (50)
);

CREATE TABLE Categoria (
id_categoria INT PRIMARY KEY NOT NULL,
id_usuario INT FOREIGN KEY REFERENCES Usuario,
nome_categoria VARCHAR (50)
);

CREATE TABLE Transacoes (
id_transacao INT PRIMARY KEY NOT NULL,
id_categoria INT FOREIGN KEY REFERENCES Categoria,
id_usuario INT FOREIGN KEY REFERENCES Usuario,
tipo_transacao VARCHAR (50),
valor FLOAT,
periodo DATE,
descricao VARCHAR (50)
);

CREATE TABLE Periodo (
id_periodo INT PRIMARY KEY,
id_usuario INT FOREIGN KEY REFERENCES Usuario,
mes INT,
ano INT,
saldo_inicial FLOAT,
saldo_final FLOAT
);

