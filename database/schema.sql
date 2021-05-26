-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: bitcornerdb.cbir5rnxhumh.us-west-1.rds.amazonaws.com    Database: BitCorner
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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `BILL`
--

DROP TABLE IF EXISTS `BILL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BILL` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `FROM_USER` varchar(100) NOT NULL,
  `TO_USER` varchar(100) NOT NULL,
  `DESCRIPTION` varchar(100) NOT NULL,
  `TARGET_CURRENCY` bigint NOT NULL,
  `AMOUNT` decimal(19,9) NOT NULL,
  `DUE_DATE` date NOT NULL,
  `STATUS` enum('Waiting','Rejected','Paid','Overdue','Cancelled') NOT NULL DEFAULT 'Waiting',
  `PAID_CURRENCY` bigint DEFAULT NULL,
  `SERVICE_FEE` decimal(19,9) NOT NULL DEFAULT '0.000000000',
  `TIME` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKakfpqgc3opwy19bl3ytgvrmn4` (`FROM_USER`),
  KEY `FK7x1g6jpxsb5erbyhwi7t8dapl` (`PAID_CURRENCY`),
  KEY `FKm3lo8yohql72i85mr4ui4hosr` (`TARGET_CURRENCY`),
  KEY `FKtniiuvsp17029dgb1adc7u45l` (`TO_USER`),
  CONSTRAINT `BILL_ibfk_1` FOREIGN KEY (`FROM_USER`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `BILL_ibfk_2` FOREIGN KEY (`TO_USER`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `BILL_ibfk_3` FOREIGN KEY (`TARGET_CURRENCY`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `BILL_ibfk_4` FOREIGN KEY (`PAID_CURRENCY`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `FK7x1g6jpxsb5erbyhwi7t8dapl` FOREIGN KEY (`PAID_CURRENCY`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `FKakfpqgc3opwy19bl3ytgvrmn4` FOREIGN KEY (`FROM_USER`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `FKm3lo8yohql72i85mr4ui4hosr` FOREIGN KEY (`TARGET_CURRENCY`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `FKtniiuvsp17029dgb1adc7u45l` FOREIGN KEY (`TO_USER`) REFERENCES `USER_INFO` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CURRENCY`
--

DROP TABLE IF EXISTS `CURRENCY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CURRENCY` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) NOT NULL,
  `CONVERSION_RATE` decimal(19,9) NOT NULL,
  `IS_CRYPTO` bit(1) NOT NULL DEFAULT b'0',
  `IS_BASE` bit(1) NOT NULL DEFAULT b'0',
  `INITIAL_VALUE` decimal(19,9) NOT NULL DEFAULT '100.000000000',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NAME` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MARKET_PRICE`
--

DROP TABLE IF EXISTS `MARKET_PRICE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MARKET_PRICE` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `BID_PRICE` decimal(19,9) NOT NULL,
  `ASK_PRICE` decimal(19,9) NOT NULL,
  `TRANSACTION_PRICE` decimal(19,9) NOT NULL,
  `CURRENCY_ID` bigint NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKa4tc78rrqujurw8h0892j0qau` (`CURRENCY_ID`),
  CONSTRAINT `FKa4tc78rrqujurw8h0892j0qau` FOREIGN KEY (`CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `MARKET_PRICE_ibfk_1` FOREIGN KEY (`CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MESSAGE`
--

DROP TABLE IF EXISTS `MESSAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MESSAGE` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `FROM_USER` varchar(100) NOT NULL,
  `TO_USER` varchar(100) NOT NULL,
  `MESSAGE` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK44agomu72retvu721gc8kgo11` (`FROM_USER`),
  KEY `FKj02ghtj1eprv43724261qqj85` (`TO_USER`),
  CONSTRAINT `FK44agomu72retvu721gc8kgo11` FOREIGN KEY (`FROM_USER`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `FKj02ghtj1eprv43724261qqj85` FOREIGN KEY (`TO_USER`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `MESSAGE_ibfk_1` FOREIGN KEY (`FROM_USER`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `MESSAGE_ibfk_2` FOREIGN KEY (`TO_USER`) REFERENCES `USER_INFO` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ORDER_TABLE`
--

DROP TABLE IF EXISTS `ORDER_TABLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ORDER_TABLE` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(100) NOT NULL,
  `TYPE` enum('BUY','SELL') NOT NULL,
  `PRICE_TYPE` enum('MARKET','LIMIT') NOT NULL,
  `QUANTITY` decimal(19,9) NOT NULL,
  `LIMIT_PRICE` decimal(19,9) DEFAULT NULL,
  `EXECUTION_PRICE` decimal(19,9) DEFAULT '0.000000000',
  `STATUS` enum('Open','Fulfilled','Cancelled') NOT NULL DEFAULT 'Open',
  `CURRENCY_ID` bigint NOT NULL,
  `SERVICE_FEE` decimal(19,9) DEFAULT '0.000000000',
  `TIME` datetime NOT NULL,
  `RUNNING_BITCOIN_BALANCE` decimal(19,9) DEFAULT NULL,
  `RUNNING_CURRENCY_BALANCE` decimal(19,9) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKpdynh7e297uwunvdxfhcoydfc` (`CURRENCY_ID`),
  KEY `FKpkw4fvdo0qyvpsauc77v07r2h` (`USER_ID`),
  CONSTRAINT `FKpdynh7e297uwunvdxfhcoydfc` FOREIGN KEY (`CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `FKpkw4fvdo0qyvpsauc77v07r2h` FOREIGN KEY (`USER_ID`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `ORDER_TABLE_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `ORDER_TABLE_ibfk_2` FOREIGN KEY (`CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_BALANCE`
--

DROP TABLE IF EXISTS `USER_BALANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER_BALANCE` (
  `USER_ID` varchar(100) NOT NULL,
  `CURRENCY_ID` bigint NOT NULL,
  `AMOUNT` decimal(19,9) NOT NULL,
  PRIMARY KEY (`USER_ID`,`CURRENCY_ID`),
  KEY `FK40ffu381k7tu2289t0m63q3nu` (`CURRENCY_ID`),
  CONSTRAINT `FK40ffu381k7tu2289t0m63q3nu` FOREIGN KEY (`CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `USER_BALANCE_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `USER_BALANCE_ibfk_2` FOREIGN KEY (`CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_BANK_INFO`
--

DROP TABLE IF EXISTS `USER_BANK_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER_BANK_INFO` (
  `USER_ID` varchar(100) NOT NULL,
  `BANK_NAME` varchar(50) NOT NULL,
  `COUNTRY` varchar(50) NOT NULL,
  `ACCOUNT_NUMBER` bigint NOT NULL,
  `OWNER_NAME` varchar(50) NOT NULL,
  `STREET` varchar(100) NOT NULL,
  `CITY` varchar(50) NOT NULL,
  `STATE` varchar(50) NOT NULL,
  `ZIP` varchar(50) NOT NULL,
  `PRIMARY_CURRENCY_ID` bigint NOT NULL,
  `initialBalance` decimal(19,9) NOT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `FK76pxd4wvwau3v8om6js865t1r` (`PRIMARY_CURRENCY_ID`),
  CONSTRAINT `FK76pxd4wvwau3v8om6js865t1r` FOREIGN KEY (`PRIMARY_CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`),
  CONSTRAINT `USER_BANK_INFO_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `USER_INFO` (`USER_ID`),
  CONSTRAINT `USER_BANK_INFO_ibfk_2` FOREIGN KEY (`PRIMARY_CURRENCY_ID`) REFERENCES `CURRENCY` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_INFO`
--

DROP TABLE IF EXISTS `USER_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER_INFO` (
  `USER_ID` varchar(100) NOT NULL,
  `USERNAME` varchar(100) NOT NULL,
  `NICKNAME` varchar(50) NOT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USERNAME` (`USERNAME`),
  UNIQUE KEY `NICKNAME` (`NICKNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-25 19:01:05
-- DROP EVENT  `DateChange`;
CREATE EVENT `DateChange` ON SCHEDULE
        EVERY 3 HOUR
--     ENABLE
--     COMMENT ''
    DO 
UPDATE BILL SET BILL.STATUS ='Overdue' WHERE BILL.DUE_DATE<curdate() AND BILL.STATUS='Waiting';
