-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.32 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para motomoto
DROP DATABASE IF EXISTS `motomoto`;
CREATE DATABASE IF NOT EXISTS `motomoto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `motomoto`;

-- Copiando estrutura para tabela motomoto.cartao
DROP TABLE IF EXISTS `cartao`;
CREATE TABLE IF NOT EXISTS `cartao` (
  `NumeroDoCartao` varchar(16) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Validade` date NOT NULL,
  `CVV` varchar(3) NOT NULL,
  `CPF_Passageiro` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`NumeroDoCartao`),
  KEY `CPF_Passageiro` (`CPF_Passageiro`),
  CONSTRAINT `cartao_ibfk_1` FOREIGN KEY (`CPF_Passageiro`) REFERENCES `usuario` (`cpf`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para view motomoto.corrida
DROP VIEW IF EXISTS `corrida`;
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `corrida` (
	`ID` INT(10) NOT NULL,
	`Nome Passageiro` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`Nome Piloto` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`Loc Passageiro` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`Destino` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`Duracao` INT(10) NOT NULL,
	`Valor` DECIMAL(10,2) NOT NULL
) ENGINE=MyISAM;

-- Copiando estrutura para tabela motomoto.corridas
DROP TABLE IF EXISTS `corridas`;
CREATE TABLE IF NOT EXISTS `corridas` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `HorarioFinal` datetime NOT NULL,
  `HorarioInicio` datetime NOT NULL,
  `Duracao` int NOT NULL,
  `Valor` decimal(10,2) NOT NULL,
  `CNH_Piloto` varchar(11) NOT NULL,
  `CPF_Passageiro` varchar(11) NOT NULL,
  `ID_Localizacao` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CNH_Piloto` (`CNH_Piloto`),
  KEY `CPF_Passageiro` (`CPF_Passageiro`),
  KEY `ID_Localizacao` (`ID_Localizacao`),
  CONSTRAINT `corridas_ibfk_1` FOREIGN KEY (`CNH_Piloto`) REFERENCES `piloto` (`cnh`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `corridas_ibfk_2` FOREIGN KEY (`CPF_Passageiro`) REFERENCES `usuario` (`cpf`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `corridas_ibfk_3` FOREIGN KEY (`ID_Localizacao`) REFERENCES `localizacao` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela motomoto.credito
DROP TABLE IF EXISTS `credito`;
CREATE TABLE IF NOT EXISTS `credito` (
  `NumeroDoCartao` varchar(16) NOT NULL,
  PRIMARY KEY (`NumeroDoCartao`),
  CONSTRAINT `credito_ibfk_1` FOREIGN KEY (`NumeroDoCartao`) REFERENCES `cartao` (`NumeroDoCartao`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela motomoto.debito
DROP TABLE IF EXISTS `debito`;
CREATE TABLE IF NOT EXISTS `debito` (
  `NumeroDoCartao` varchar(16) NOT NULL,
  PRIMARY KEY (`NumeroDoCartao`),
  CONSTRAINT `debito_ibfk_1` FOREIGN KEY (`NumeroDoCartao`) REFERENCES `cartao` (`NumeroDoCartao`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para procedure motomoto.DeletePassageiro
DROP PROCEDURE IF EXISTS `DeletePassageiro`;
DELIMITER //
CREATE PROCEDURE `DeletePassageiro`(
	IN `cpf_param` VARCHAR(11)
)
BEGIN
    -- Verificar se o CPF existe na tabela "passageiro"
    IF EXISTS (SELECT 1 FROM passageiro WHERE cpf = cpf_param) THEN
        -- Verificar se o CPF existe na tabela "piloto"
        IF EXISTS (SELECT 1 FROM piloto WHERE cpf = cpf_param) THEN
            -- Excluir linha da tabela "passageiro" com o CPF correspondente
            DELETE FROM passageiro WHERE cpf = cpf_param;
        ELSE
            -- Excluir linha da tabela "usuario" com o CPF correspondente
            DELETE FROM usuario WHERE cpf = cpf_param;
        END IF;
    ELSE
        -- Retornar erro informando que o CPF não foi encontrado na tabela "passageiro"
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Passageiro não encontrado!';
    END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure motomoto.DeletePiloto
DROP PROCEDURE IF EXISTS `DeletePiloto`;
DELIMITER //
CREATE PROCEDURE `DeletePiloto`(
	IN `cpf_param` VARCHAR(11)
)
BEGIN
    -- Verificar se o CPF existe na tabela "piloto"
    IF EXISTS (SELECT 1 FROM piloto WHERE cpf = cpf_param) THEN
        -- Verificar se o CPF existe na tabela "passageiro"
        IF EXISTS (SELECT 1 FROM passageiro WHERE cpf = cpf_param) THEN
            -- Excluir linha da tabela "piloto" com o CPF correspondente
            DELETE FROM piloto WHERE cpf = cpf_param;
        ELSE
            -- Excluir linha da tabela "usuario" com o CPF correspondente
            DELETE FROM usuario WHERE cpf = cpf_param;
        END IF;
    ELSE
        -- Retornar erro informando que o CPF não foi encontrado na tabela "passageiro"
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Piloto não encontrado!';
    END IF;
END//
DELIMITER ;

-- Copiando estrutura para tabela motomoto.empresas
DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
  `CNPJ` varchar(14) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Telefone` varchar(20) NOT NULL,
  `RazaoSocial` varchar(255) NOT NULL,
  `Responsavel` varchar(255) NOT NULL,
  PRIMARY KEY (`CNPJ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para procedure motomoto.InsertPassageiro
DROP PROCEDURE IF EXISTS `InsertPassageiro`;
DELIMITER //
CREATE PROCEDURE `InsertPassageiro`(
	IN `cpf_param` VARCHAR(11),
	IN `nome_param` VARCHAR(255),
	IN `telefone_param` VARCHAR(20),
	IN `email_param` VARCHAR(255),
	IN `data_nascimento_param` DATE,
	IN `senha_param` VARCHAR(255)
)
BEGIN
  DECLARE user_count INT;
  
  -- Verificar se o usuário já existe na tabela usuario
  SELECT COUNT(*) INTO user_count FROM usuario WHERE cpf = cpf_param;
  
  -- Se o usuário já existe, fazer o INSERT na tabela passageiro
  IF user_count > 0 THEN
    INSERT INTO passageiro (cpf, senha) VALUES (cpf_param, senha_param);
  ELSE
    BEGIN
      -- Se o usuário não existe, fazer o INSERT na tabela usuario e depois na tabela passageiro
      INSERT INTO usuario (cpf, nome, telefone, email, dataNascimento)
      VALUES (cpf_param, nome_param, telefone_param, email_param, data_nascimento_param);
      
      INSERT INTO passageiro (cpf, senha) VALUES (cpf_param, senha_param);
    END;
  END IF;
  
END//
DELIMITER ;

-- Copiando estrutura para procedure motomoto.InsertPiloto
DROP PROCEDURE IF EXISTS `InsertPiloto`;
DELIMITER //
CREATE PROCEDURE `InsertPiloto`(
  IN cpf_param VARCHAR(11),
  IN nome_param VARCHAR(255),
  IN telefone_param VARCHAR(20),
  IN email_param VARCHAR(255),
  IN data_nascimento_param DATE,
  IN cnh_param VARCHAR(255),
  IN dadosBancarios_param VARCHAR(255),
  IN documentoVeiculo_param VARCHAR(255),
  IN cnpjEmpresa_param VARCHAR(255),
  IN senha_param VARCHAR(255)
)
BEGIN
  DECLARE user_count INT;
  
  -- Verificar se o usuário já existe na tabela usuario
  SELECT COUNT(*) INTO user_count FROM usuario WHERE cpf = cpf_param;
  
  -- Se o usuário já existe, fazer o INSERT na tabela piloto
  IF user_count > 0 THEN
    INSERT INTO piloto (cpf, cnh, dadosBancarios, documentoVeiculo, cnpjEmpresa, senha) VALUES (cpf_param, cnh_param, dadosBancarios_param, documentoVeiculo_param, cnpjEmpresa_param, senha_param);
  ELSE
    BEGIN
      -- Se o usuário não existe, fazer o INSERT na tabela usuario e depois na tabela piloto
      INSERT INTO usuario (cpf, nome, telefone, email, dataNascimento)
      VALUES (cpf_param, nome_param, telefone_param, email_param, data_nascimento_param);
      
      INSERT INTO piloto (cpf, cnh, dadosBancarios, documentoVeiculo, cnpjEmpresa, senha) 
		VALUES (cpf_param, cnh_param, dadosBancarios_param, documentoVeiculo_param, cnpjEmpresa_param, senha_param);
    END;
  END IF;
  
END//
DELIMITER ;

-- Copiando estrutura para tabela motomoto.localizacao
DROP TABLE IF EXISTS `localizacao`;
CREATE TABLE IF NOT EXISTS `localizacao` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `LocalizacaoOrigemPiloto` varchar(255) NOT NULL,
  `LocalizacaoPassageiro` varchar(255) NOT NULL,
  `Destino` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela motomoto.pagamento
DROP TABLE IF EXISTS `pagamento`;
CREATE TABLE IF NOT EXISTS `pagamento` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TipoDePagamento` enum('Crédito','Débito','Dinheiro') NOT NULL,
  `NumeroDoCartao` varchar(16) DEFAULT NULL,
  `ID_Corrida` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `NumeroDoCartao` (`NumeroDoCartao`),
  KEY `ID_Corrida` (`ID_Corrida`),
  CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`NumeroDoCartao`) REFERENCES `cartao` (`NumeroDoCartao`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pagamento_ibfk_2` FOREIGN KEY (`ID_Corrida`) REFERENCES `corridas` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela motomoto.passageiro
DROP TABLE IF EXISTS `passageiro`;
CREATE TABLE IF NOT EXISTS `passageiro` (
  `cpf` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `senha` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`cpf`) USING BTREE,
  CONSTRAINT `passageiro_ibfk_1` FOREIGN KEY (`cpf`) REFERENCES `usuario` (`cpf`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela motomoto.piloto
DROP TABLE IF EXISTS `piloto`;
CREATE TABLE IF NOT EXISTS `piloto` (
  `cpf` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cnh` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dadosBancarios` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `documentoVeiculo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cnpjEmpresa` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `senha` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`cnh`) USING BTREE,
  KEY `CPF` (`cpf`) USING BTREE,
  KEY `CNPJ_Empresa` (`cnpjEmpresa`) USING BTREE,
  CONSTRAINT `piloto_ibfk_1` FOREIGN KEY (`cpf`) REFERENCES `usuario` (`cpf`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `piloto_ibfk_2` FOREIGN KEY (`cnpjEmpresa`) REFERENCES `empresas` (`CNPJ`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela motomoto.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `cpf` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dataNascimento` date NOT NULL,
  `tipoUsuario` int NOT NULL,
  PRIMARY KEY (`cpf`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para view motomoto.corrida
DROP VIEW IF EXISTS `corrida`;
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `corrida`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `corrida` AS select `corridas`.`ID` AS `ID`,`pas`.`Nome` AS `Nome Passageiro`,`pil`.`Nome` AS `Nome Piloto`,`localizacao`.`LocalizacaoPassageiro` AS `Loc Passageiro`,`localizacao`.`Destino` AS `Destino`,`corridas`.`Duracao` AS `Duracao`,`corridas`.`Valor` AS `Valor` from ((((select `usuario`.`nome` AS `Nome`,`usuario`.`cpf` AS `CPF` from (`usuario` join `passageiro` on((`usuario`.`cpf` = `passageiro`.`cpf`)))) `pas` join `corridas` on((`corridas`.`CPF_Passageiro` = `pas`.`CPF`))) join (select `usuario`.`nome` AS `Nome`,`piloto`.`cnh` AS `CNH` from (`usuario` join `piloto` on((`usuario`.`cpf` = `piloto`.`cpf`)))) `pil` on((`corridas`.`CNH_Piloto` = `pil`.`CNH`))) join `localizacao` on((`corridas`.`ID_Localizacao` = `localizacao`.`ID`)));

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
