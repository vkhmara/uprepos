-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `hashtags`
--

DROP TABLE IF EXISTS `hashtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtags` (
  `idOfHashTags` int NOT NULL AUTO_INCREMENT,
  `idOfPost` int NOT NULL,
  `hashTag` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idOfHashTags`),
  KEY `fk_hashTags_Posts2` (`idOfPost`),
  CONSTRAINT `fk_hashTags_Posts2` FOREIGN KEY (`idOfPost`) REFERENCES `posts` (`idOfPost`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtags`
--

LOCK TABLES `hashtags` WRITE;
/*!40000 ALTER TABLE `hashtags` DISABLE KEYS */;
INSERT INTO `hashtags` VALUES (1,21,'#hello'),(2,22,'#hello'),(3,27,'#hello'),(4,27,'#hai'),(5,33,'#hai'),(6,34,'#ni_hao');
/*!40000 ALTER TABLE `hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `idOfLikes` int NOT NULL AUTO_INCREMENT,
  `idOfPost` int NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`idOfLikes`),
  KEY `fk_likes_Posts1_idx` (`idOfPost`),
  KEY `fk_likes_Users1_idx` (`username`),
  CONSTRAINT `fk_likes_Posts1` FOREIGN KEY (`idOfPost`) REFERENCES `posts` (`idOfPost`),
  CONSTRAINT `fk_likes_Users1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,2,'incredible42'),(4,18,'very_incredible'),(5,5,'very_incredible'),(6,10,'very_incredible'),(7,40,'very_incredible'),(8,3,'very_incredible'),(9,27,'very_incredible'),(10,19,'very_incredible'),(12,13,'very_incredible'),(13,18,'incredible5'),(14,10,'incredible5'),(15,5,'incredible5'),(16,30,'incredible5'),(17,6,'incredible5'),(18,33,'incredible5'),(19,37,'incredible5'),(20,34,'incredible5'),(21,24,'incredible5'),(22,12,'incredible5'),(23,14,'iamnewuser'),(24,5,'iamnewuser'),(25,30,'iamnewuser'),(26,40,'iamnewuser'),(27,3,'iamnewuser'),(28,13,'iamnewuser'),(29,4,'iamnewuser'),(30,17,'iamnewuser'),(31,12,'iamnewuser'),(32,23,'iamnewuser'),(33,41,'iamnewuser'),(34,18,'iamnewuser');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `idOfPost` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `description` varchar(280) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idOfPost`),
  KEY `fk_Posts_Users1_idx` (`username`),
  CONSTRAINT `fk_Posts_Users1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'incredible2','Hello','2019-06-24 22:47:41'),(2,'incredible6','Hello','2019-09-22 06:18:04'),(3,'incredible12','Hello','2020-02-08 01:05:05'),(4,'incredible20','Hello','2020-01-14 14:55:11'),(5,'incredible30','Hello','2020-05-09 14:24:51'),(6,'incredible42','Hello','2019-12-28 20:21:22'),(7,'incredible3','Hello','2019-10-26 11:06:47'),(8,'incredible19','Hello, it\'s me.','2019-07-13 19:47:52'),(9,'incredible37','Hello','2019-10-29 02:51:23'),(10,'incredible4','Hello','2020-05-08 07:21:44'),(11,'incredible26','Hello','2019-10-17 22:44:47'),(12,'incredible50','Hello','2019-11-09 21:23:19'),(13,'incredible23','Hello','2020-01-16 14:35:16'),(14,'incredible51','Hello','2020-05-09 14:40:46'),(15,'incredible28','Hello','2019-11-02 02:45:26'),(16,'incredible7','Hello','2019-09-05 21:06:50'),(17,'incredible41','Hello','2020-01-03 12:23:09'),(18,'incredible24','Hello','2020-05-12 08:46:20'),(19,'incredible9','Hello','2019-06-14 02:39:24'),(20,'incredible49','Hello','2019-06-20 18:38:58'),(21,'incredible4','Hello182','2019-08-16 00:27:58'),(22,'incredible4','Hello707','2019-10-13 00:22:08'),(23,'incredible4','Hello46','2019-11-10 11:57:09'),(24,'incredible4','Hello111','2019-12-07 10:14:22'),(25,'incredible4','Hello481','2019-12-15 02:38:40'),(26,'incredible4','Hello211','2020-01-05 17:41:38'),(27,'incredible4','Hello154','2019-06-07 13:53:03'),(28,'incredible4','Hello564','2020-01-23 12:15:11'),(29,'incredible4','Hello931','2019-07-05 20:30:55'),(30,'incredible4','Hello990','2020-04-25 00:08:16'),(31,'incredible5','Hello633','2019-07-10 09:20:03'),(32,'incredible5','Hello468','2019-09-27 18:55:54'),(33,'incredible5','Hello530','2019-12-27 12:39:01'),(34,'incredible5','Hello927. Yeeeee','2019-12-20 18:54:23'),(35,'incredible5','Hello549','2019-07-19 11:25:13'),(36,'incredible5','Hello616','2019-10-26 04:03:24'),(37,'incredible5','Hello682','2019-12-23 17:20:30'),(38,'incredible5','Hello208','2019-07-28 00:46:26'),(39,'incredible5','Hello940','2019-10-22 02:59:26'),(40,'incredible5','Hello999','2020-03-15 21:40:13'),(41,'iamnewuser','It\'s my post','2020-05-28 10:02:20');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('hahahah','hahaha'),('iamnewuser','itismypassword'),('incredible12','incredible12'),('incredible19','incredible19'),('incredible2','incredible2'),('incredible20','incredible20'),('incredible23','incredible23'),('incredible24','incredible24'),('incredible26','incredible26'),('incredible28','incredible28'),('incredible3','incredible3'),('incredible30','incredible30'),('incredible37','incredible37'),('incredible4','incredible4'),('incredible41','incredible41'),('incredible42','incredible42'),('incredible49','incredible49'),('incredible5','incredible5'),('incredible50','incredible50'),('incredible51','incredible51'),('incredible6','incredible6'),('incredible7','incredible7'),('incredible9','incredible9'),('very_incredible','1716002167402ad');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28 11:17:16
