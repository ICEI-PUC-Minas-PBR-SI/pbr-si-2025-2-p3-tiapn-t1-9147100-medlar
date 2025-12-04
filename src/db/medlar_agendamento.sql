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
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `id_agendamento` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_profissional` int NOT NULL,
  `id_servico` int NOT NULL,
  `data_hora` datetime NOT NULL,
  `status` enum('pendente','confirmado','cancelado','concluido') DEFAULT 'pendente',
  `preco_final` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_agendamento`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profissional` (`id_profissional`,`id_servico`),
  CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`id_profissional`, `id_servico`) REFERENCES `profissional_servico` (`id_profissional`, `id_servico`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
INSERT INTO `agendamento` VALUES (1,1,1,1,'2025-01-15 09:00:00','confirmado',190.00),(2,2,2,2,'2025-02-20 10:30:00','pendente',130.00),(3,3,3,3,'2025-03-05 14:00:00','confirmado',290.00),(4,4,4,4,'2025-04-12 16:00:00','concluido',440.00),(5,5,5,5,'2025-05-18 11:00:00','confirmado',360.00),(6,6,6,6,'2025-06-25 08:30:00','pendente',320.00),(7,7,7,7,'2025-07-09 13:15:00','confirmado',330.00),(8,8,8,8,'2025-08-22 15:00:00','concluido',395.00),(9,9,9,9,'2025-09-10 09:45:00','confirmado',230.00),(10,10,10,10,'2025-10-03 10:00:00','pendente',270.00),(11,11,11,11,'2025-11-11 14:30:00','confirmado',310.00),(12,12,12,12,'2025-12-20 16:30:00','confirmado',210.00),(13,13,13,13,'2025-02-14 09:00:00','pendente',350.00),(14,14,14,14,'2025-03-21 11:00:00','confirmado',370.00),(15,15,15,15,'2025-04-28 12:30:00','concluido',340.00),(16,16,16,16,'2025-05-06 08:00:00','confirmado',520.00),(17,17,17,17,'2025-06-17 10:30:00','pendente',470.00),(18,18,18,18,'2025-07-23 15:30:00','confirmado',250.00),(19,19,19,19,'2025-08-30 13:00:00','confirmado',190.00),(20,20,20,20,'2025-09-07 09:30:00','concluido',490.00),(21,21,21,21,'2025-10-14 11:45:00','pendente',340.00),(22,22,22,22,'2025-11-02 14:00:00','confirmado',320.00),(23,23,23,23,'2025-12-08 16:15:00','confirmado',240.00),(24,24,24,24,'2025-01-30 10:20:00','confirmado',360.00),(25,25,25,25,'2025-02-11 13:40:00','pendente',260.00),(26,26,26,26,'2025-03-19 09:10:00','confirmado',210.00),(27,27,27,27,'2025-04-01 15:50:00','concluido',300.00),(28,28,28,28,'2025-05-13 11:25:00','confirmado',320.00),(29,29,29,29,'2025-06-29 08:45:00','confirmado',440.00),(30,30,30,30,'2025-07-16 10:05:00','pendente',390.00);
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-02 22:38:38
