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
-- Table structure for table `cartao_credito`
--

DROP TABLE IF EXISTS `cartao_credito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartao_credito` (
  `id_cartao` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `numero_cartao` varchar(20) NOT NULL,
  `nome_titular` varchar(100) NOT NULL,
  `validade` char(5) NOT NULL,
  `bandeira` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_cartao`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `cartao_credito_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartao_credito`
--

LOCK TABLES `cartao_credito` WRITE;
/*!40000 ALTER TABLE `cartao_credito` DISABLE KEYS */;
INSERT INTO `cartao_credito` VALUES (1,1,'4111111111111111','João Marcelo de Souza Albuquerque','12/26','Visa'),(2,2,'5500000000000004','Maria Fernanda dos Santos Oliveira','11/27','Mastercard'),(3,3,'340000000000009','Carlos Eduardo Martins de Andrade','09/26','Amex'),(4,4,'6011000000000004','Ana Beatriz Rodrigues de Almeida','08/27','Discover'),(5,5,'3530111333300000','Fernanda Clarice Pereira de Lima','01/28','JCB'),(6,6,'4111111111111122','Mariana Gabriela Souza da Rocha','03/28','Visa'),(7,7,'5500000000000015','Ricardo Augusto Ferreira de Moraes','05/29','Mastercard'),(8,8,'340000000000010','Patrícia Helena Gomes de Castro','07/27','Amex'),(9,9,'6011000000000012','Eduardo Henrique dos Reis Batista','10/29','Discover'),(10,10,'3530111333300011','Adriana Lucia Moreira de Carvalho','02/28','JCB'),(11,11,'4111111111111133','Gustavo Henrique de Souza Menezes','04/30','Visa'),(12,12,'5500000000000026','Luciana Cristina da Silva Domingues','06/30','Mastercard'),(13,13,'340000000000011','Bruno Alexandre dos Santos Pereira','09/28','Amex'),(14,14,'6011000000000023','Sofia Carolina de Almeida Nascimento','11/29','Discover'),(15,15,'3530111333300022','Mateus Vinicius Ribeiro de Freitas','12/27','JCB'),(16,16,'4111111111111144','Camila Letícia dos Reis Oliveira','01/29','Visa'),(17,17,'5500000000000037','Roberto Carlos de Almeida Santos','03/28','Mastercard'),(18,18,'340000000000012','Beatriz Helena de Castro Moreira','04/29','Amex'),(19,19,'6011000000000034','Felipe Augusto Lima de Souza Neto','05/30','Discover'),(20,20,'3530111333300033','Renata Carolina Pereira de Barros','06/30','JCB'),(21,21,'4111111111111155','Sérgio Antônio de Oliveira Fonseca','08/28','Visa'),(22,22,'5500000000000048','Amanda Vitória dos Santos Ribeiro','10/29','Mastercard'),(23,23,'340000000000013','Paulo Henrique de Souza Albuquerque','11/27','Amex'),(24,24,'6011000000000045','Marcos Vinicius de Araujo Monteiro','12/28','Discover'),(25,25,'3530111333300044','Isabela Fernanda de Melo Rodrigues','02/30','JCB'),(26,26,'4111111111111166','Thiago Luis de Oliveira Santana','03/29','Visa'),(27,27,'5500000000000059','Daniela Regina dos Santos Moreira','04/30','Mastercard'),(28,28,'340000000000014','Rafael Gonçalo de Souza Fernandes','05/29','Amex'),(29,29,'6011000000000056','Juliana Patrícia de Oliveira Nunes','06/28','Discover'),(30,30,'3530111333300055','Vitor Hugo de Almeida Carvalho Neto','07/30','JCB');
/*!40000 ALTER TABLE `cartao_credito` ENABLE KEYS */;
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
