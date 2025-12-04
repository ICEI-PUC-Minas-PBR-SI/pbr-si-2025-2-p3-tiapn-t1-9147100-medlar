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
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `id_servico` int NOT NULL AUTO_INCREMENT,
  `nome_servico` varchar(100) DEFAULT NULL,
  `descricao` text,
  `valor_base` decimal(10,0) DEFAULT NULL,
  `duracao_padrao` int DEFAULT NULL,
  PRIMARY KEY (`id_servico`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (1,'Consulta Médica Geral Avançada','Consulta geral com avaliação completa',180,40),(2,'Retorno de Acompanhamento Clínico','Consulta de retorno e ajuste de tratamento',120,25),(3,'Exame Laboratorial de Rotina Completo','Painel laboratorial básico e marcadores',280,60),(4,'Consulta com Especialista Cardiologia','Avaliação cardíaca especializada',420,50),(5,'Avaliação Ortopédica Completa','Exame e avaliação de imagem',350,45),(6,'Consulta Ginecológica com Preventivo','Consulta com exame preventivo',300,40),(7,'Consulta Endocrinológica com Análise','Avaliação hormonal e prescrição',320,45),(8,'Consulta Neurológica Especializada','Avaliação neurológica detalhada',380,50),(9,'Consulta Oftalmológica Completa','Teste de visão e mapa retinal',220,35),(10,'Consulta Psiquiátrica Inicial','Avaliação psiquiátrica e encaminhamento',260,45),(11,'Consulta Urológica com Exames','Avaliação urológica completa',300,40),(12,'Consulta Nutricional Personalizada','Plano alimentar e orientação',200,45),(13,'Consulta Pneumológica Especializada','Avaliação respiratória completa',340,45),(14,'Consulta Reumatológica Detalhada','Diagnóstico e plano terapêutico',360,45),(15,'Avaliação Gastroenterológica Completa','Endoscopia opcional',330,50),(16,'Consulta Oncológica Inicial com Plano','Avaliação e plano terapêutico',500,60),(17,'Consulta Cirúrgica Geral Avaliação','Avaliação pré-operatória detalhada',450,55),(18,'Consulta Oftalmologia Pediátrica Especial','Avaliação ocular infantil',240,35),(19,'Consulta Cardiologia Intervencionista','Avaliação para procedimentos',600,70),(20,'Sessão de Fisioterapia Avançada','Tratamento e reabilitação',180,50),(21,'Consulta Cirurgia Ortopédica Especial','Avaliação para cirurgia',480,60),(22,'Procedimento Dermatológico Cosmético','Pequenos procedimentos estéticos',320,45),(23,'Consulta Endocrinologia Pediátrica Completa','Avaliação hormonal infantil',300,40),(24,'Avaliação Medicina do Trabalho Completa','Exames e laudos ocupacionais',220,30),(25,'Consulta Infectologia com Testes','Avaliação e testes específicos',350,45),(26,'Consulta Otorrinolaringologia Completa','Avaliação auditiva e respiratória',260,40),(27,'Exame de Imagem Radiológico Básico','Raio-x e laudo',200,30),(28,'Consulta Alergologia Detalhada','Testes e prescrição',310,45),(29,'Avaliação Vascular com Doppler','Estudo vascular completo',430,55),(30,'Procedimento Medicina Estética Avançado','Sessão de estética com protocolos',380,50);
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
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
