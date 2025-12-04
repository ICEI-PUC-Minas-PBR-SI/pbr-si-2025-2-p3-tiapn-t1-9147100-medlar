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
-- Table structure for table `pagamento`
--

DROP TABLE IF EXISTS `pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamento` (
  `id_pagamento` int NOT NULL AUTO_INCREMENT,
  `id_agendamento` int NOT NULL,
  `id_metodo` int NOT NULL,
  `data_pagamento` datetime NOT NULL,
  `valor_pago` decimal(10,2) NOT NULL,
  `status_pagamento` enum('pendente','aprovado','cancelado') DEFAULT 'pendente',
  `codigo_transacao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_pagamento`),
  KEY `id_agendamento` (`id_agendamento`),
  KEY `id_metodo` (`id_metodo`),
  CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`id_agendamento`) REFERENCES `agendamento` (`id_agendamento`),
  CONSTRAINT `pagamento_ibfk_2` FOREIGN KEY (`id_metodo`) REFERENCES `metodo_pagamento` (`id_metodo`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento`
--

LOCK TABLES `pagamento` WRITE;
/*!40000 ALTER TABLE `pagamento` DISABLE KEYS */;
INSERT INTO `pagamento` VALUES (31,1,1,'2025-01-15 09:30:00',190.00,'aprovado','TRX0001'),(32,2,2,'2025-02-20 11:00:00',130.00,'pendente','TRX0002'),(33,3,3,'2025-03-05 14:45:00',290.00,'aprovado','TRX0003'),(34,4,4,'2025-04-12 16:50:00',440.00,'aprovado','TRX0004'),(35,5,5,'2025-05-18 11:30:00',360.00,'aprovado','TRX0005'),(36,6,6,'2025-06-25 09:00:00',320.00,'pendente','TRX0006'),(37,7,7,'2025-07-09 13:45:00',330.00,'aprovado','TRX0007'),(38,8,8,'2025-08-22 15:30:00',395.00,'aprovado','TRX0008'),(39,9,9,'2025-09-10 10:15:00',230.00,'aprovado','TRX0009'),(40,10,10,'2025-10-03 10:40:00',270.00,'pendente','TRX0010'),(41,11,11,'2025-11-11 15:00:00',310.00,'aprovado','TRX0011'),(42,12,12,'2025-12-20 17:00:00',210.00,'aprovado','TRX0012'),(43,13,13,'2025-02-14 09:30:00',350.00,'pendente','TRX0013'),(44,14,14,'2025-03-21 11:40:00',370.00,'aprovado','TRX0014'),(45,15,15,'2025-04-28 13:00:00',340.00,'aprovado','TRX0015'),(46,16,16,'2025-05-06 08:30:00',520.00,'aprovado','TRX0016'),(47,17,17,'2025-06-17 11:00:00',470.00,'pendente','TRX0017'),(48,18,18,'2025-07-23 16:00:00',250.00,'aprovado','TRX0018'),(49,19,19,'2025-08-30 13:30:00',190.00,'aprovado','TRX0019'),(50,20,20,'2025-09-07 10:00:00',490.00,'aprovado','TRX0020'),(51,21,21,'2025-10-14 12:15:00',340.00,'pendente','TRX0021'),(52,22,22,'2025-11-02 14:30:00',320.00,'aprovado','TRX0022'),(53,23,23,'2025-12-08 16:45:00',240.00,'aprovado','TRX0023'),(54,24,24,'2025-01-30 10:50:00',360.00,'aprovado','TRX0024'),(55,25,25,'2025-02-11 14:10:00',260.00,'pendente','TRX0025'),(56,26,26,'2025-03-19 09:40:00',210.00,'aprovado','TRX0026'),(57,27,27,'2025-04-01 16:20:00',300.00,'aprovado','TRX0027'),(58,28,28,'2025-05-13 11:55:00',320.00,'aprovado','TRX0028'),(59,29,29,'2025-06-29 09:15:00',440.00,'aprovado','TRX0029'),(60,30,30,'2025-07-16 10:35:00',390.00,'pendente','TRX0030');
/*!40000 ALTER TABLE `pagamento` ENABLE KEYS */;
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
