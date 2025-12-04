-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: medlar
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `metodo_pagamento`
--

DROP TABLE IF EXISTS `metodo_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pagamento` (
  `id_metodo` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('credito','debito','pix','dinheiro') NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_metodo`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pagamento`
--

LOCK TABLES `metodo_pagamento` WRITE;
/*!40000 ALTER TABLE `metodo_pagamento` DISABLE KEYS */;
INSERT INTO `metodo_pagamento` VALUES (1,'credito','Cartão de crédito - Visa pessoal'),(2,'debito','Cartão de débito - Conta corrente'),(3,'pix','PIX - Transferência instantânea'),(4,'dinheiro','Pagamento em espécie'),(5,'credito','Cartão de crédito - Mastercard pessoal'),(6,'debito','Cartão de débito - Conta salário'),(7,'pix','PIX - Chave e-mail'),(8,'dinheiro','Pagamento em espécie - troco disponível'),(9,'credito','Cartão de crédito - Empresarial'),(10,'debito','Cartão de débito - Pré-pago'),(11,'pix','PIX - Chave CPF'),(12,'dinheiro','Pagamento em espécie - pagamento parcial'),(13,'credito','Cartão de crédito - Internacional'),(14,'debito','Cartão de débito - Conta PJ'),(15,'pix','PIX - Chave telefone'),(16,'dinheiro','Pagamento em espécie - desconto aplicado'),(17,'credito','Cartão de crédito - Parcelamento 2x'),(18,'debito','Cartão de débito - Conta digital'),(19,'pix','PIX - Agendado'),(20,'dinheiro','Pagamento em espécie - pacote'),(21,'credito','Cartão de crédito - Parcelamento 3x'),(22,'debito','Cartão de débito - Multibanco'),(23,'pix','PIX - QR Code'),(24,'dinheiro','Pagamento em espécie - serviço menor'),(25,'credito','Cartão de crédito - Corporativo'),(26,'debito','Cartão de débito - Conjunta'),(27,'pix','PIX - Recebimento imediato'),(28,'dinheiro','Pagamento em espécie - recibo gerado'),(29,'credito','Cartão de crédito - Bandeira local'),(30,'pix','PIX - Doação/avulso');
/*!40000 ALTER TABLE `metodo_pagamento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-02 22:38:39
