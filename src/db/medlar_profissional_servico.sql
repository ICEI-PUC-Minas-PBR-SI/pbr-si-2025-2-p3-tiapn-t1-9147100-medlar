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
-- Table structure for table `profissional_servico`
--

DROP TABLE IF EXISTS `profissional_servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissional_servico` (
  `id_profissional` int NOT NULL,
  `id_servico` int NOT NULL,
  `valor_profissional` decimal(10,2) DEFAULT NULL,
  `duracao_profissional` int DEFAULT NULL,
  PRIMARY KEY (`id_profissional`,`id_servico`),
  KEY `id_servico` (`id_servico`),
  CONSTRAINT `profissional_servico_ibfk_1` FOREIGN KEY (`id_profissional`) REFERENCES `profissional` (`id_profissional`),
  CONSTRAINT `profissional_servico_ibfk_2` FOREIGN KEY (`id_servico`) REFERENCES `servico` (`id_servico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissional_servico`
--

LOCK TABLES `profissional_servico` WRITE;
/*!40000 ALTER TABLE `profissional_servico` DISABLE KEYS */;
INSERT INTO `profissional_servico` VALUES (1,1,190.00,40),(2,2,130.00,25),(3,3,290.00,60),(4,4,440.00,50),(5,5,360.00,45),(6,6,320.00,40),(7,7,330.00,45),(8,8,395.00,50),(9,9,230.00,35),(10,10,270.00,45),(11,11,310.00,40),(12,12,210.00,45),(13,13,350.00,45),(14,14,370.00,45),(15,15,340.00,50),(16,16,520.00,60),(17,17,470.00,55),(18,18,250.00,35),(19,19,190.00,50),(20,20,490.00,60),(21,21,340.00,45),(22,22,320.00,40),(23,23,240.00,30),(24,24,360.00,45),(25,25,260.00,40),(26,26,210.00,30),(27,27,300.00,45),(28,28,320.00,45),(29,29,440.00,55),(30,30,390.00,50);
/*!40000 ALTER TABLE `profissional_servico` ENABLE KEYS */;
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
