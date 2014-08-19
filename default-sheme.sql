/*
SQLyog Ultimate v11.01 (64 bit)
MySQL - 5.5.28 : Database - dotori
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dotori` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `dotori`;

/*Table structure for table `parsing_data` */

DROP TABLE IF EXISTS `parsing_data`;

CREATE TABLE `parsing_data` (
  `visit_pn` int(11) NOT NULL COMMENT '방문 고유번호',
  `title` text COMMENT '제목',
  `html` mediumtext COMMENT 'html source',
  KEY `visit_pn` (`visit_pn`),
  CONSTRAINT `parsing_data_ibfk_1` FOREIGN KEY (`visit_pn`) REFERENCES `parsing_visit` (`pn`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `parsing_data` */

LOCK TABLES `parsing_data` WRITE;

UNLOCK TABLES;

/*Table structure for table `parsing_image` */

DROP TABLE IF EXISTS `parsing_image`;

CREATE TABLE `parsing_image` (
  `visit_pn` int(11) NOT NULL COMMENT '방문 기록 고유번호',
  `url` text COMMENT '이미지 URL',
  `width` int(5) DEFAULT NULL COMMENT '가로',
  `height` int(5) DEFAULT NULL COMMENT '세로',
  `color` tinyint(4) DEFAULT NULL COMMENT '색상',
  KEY `visit_pn` (`visit_pn`),
  CONSTRAINT `parsing_image_ibfk_1` FOREIGN KEY (`visit_pn`) REFERENCES `parsing_visit` (`pn`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `parsing_image` */

LOCK TABLES `parsing_image` WRITE;

UNLOCK TABLES;

/*Table structure for table `parsing_text` */

DROP TABLE IF EXISTS `parsing_text`;

CREATE TABLE `parsing_text` (
  `visit_pn` int(11) NOT NULL COMMENT '방문기록 고유번호',
  `keyword1` varchar(255) DEFAULT NULL COMMENT '핵심키워드(중요도1)',
  `keyword2` varchar(255) DEFAULT NULL COMMENT '핵심키워드(중요도2)',
  `kewword3` varchar(255) DEFAULT NULL COMMENT '핵심키워드(중요도3)',
  KEY `visit_pn` (`visit_pn`),
  CONSTRAINT `parsing_text_ibfk_1` FOREIGN KEY (`visit_pn`) REFERENCES `parsing_visit` (`pn`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `parsing_text` */

LOCK TABLES `parsing_text` WRITE;

UNLOCK TABLES;

/*Table structure for table `parsing_url` */

DROP TABLE IF EXISTS `parsing_url`;

CREATE TABLE `parsing_url` (
  `pn` int(11) NOT NULL AUTO_INCREMENT COMMENT 'URL 고유번호',
  `url` text NOT NULL COMMENT 'URL 정보',
  `domain` varchar(255) NOT NULL COMMENT '정규식으로 걸러진 Domain',
  `favicon` varchar(255) NOT NULL COMMENT 'Favicon Url',
  PRIMARY KEY (`pn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `parsing_url` */

LOCK TABLES `parsing_url` WRITE;

UNLOCK TABLES;

/*Table structure for table `parsing_visit` */

DROP TABLE IF EXISTS `parsing_visit`;

CREATE TABLE `parsing_visit` (
  `pn` int(11) NOT NULL AUTO_INCREMENT COMMENT '방문날짜 고유번호',
  `url_pn` int(11) NOT NULL COMMENT 'URL 고유번호',
  `user_pn` int(11) NOT NULL COMMENT '사용자 고유번호',
  `register_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '등록날짜',
  PRIMARY KEY (`pn`),
  KEY `url_pn` (`url_pn`),
  KEY `user_pn` (`user_pn`),
  CONSTRAINT `parsing_visit_ibfk_1` FOREIGN KEY (`url_pn`) REFERENCES `parsing_url` (`pn`) ON UPDATE NO ACTION,
  CONSTRAINT `parsing_visit_ibfk_2` FOREIGN KEY (`user_pn`) REFERENCES `user` (`pn`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `parsing_visit` */

LOCK TABLES `parsing_visit` WRITE;

UNLOCK TABLES;

/*Table structure for table `regex_group` */

DROP TABLE IF EXISTS `regex_group`;

CREATE TABLE `regex_group` (
  `pn` int(11) NOT NULL AUTO_INCREMENT COMMENT '그룹 번호',
  `name` varchar(255) NOT NULL COMMENT '정규표현식 그룹 이름',
  PRIMARY KEY (`pn`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `regex_group` */

LOCK TABLES `regex_group` WRITE;

insert  into `regex_group`(`pn`,`name`) values (1,'Tag'),(2,'Delete'),(3,'Select'),(4,'SelectTag'),(5,'src');

UNLOCK TABLES;

/*Table structure for table `regex_image` */

DROP TABLE IF EXISTS `regex_image`;

CREATE TABLE `regex_image` (
  `pn` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `group_pn` int(11) NOT NULL COMMENT '정규표현식 그룹 종류 고유번호',
  `shape` varchar(255) DEFAULT NULL COMMENT '정규표현식 형태',
  PRIMARY KEY (`pn`),
  KEY `group_pn` (`group_pn`),
  CONSTRAINT `regex_image_ibfk_1` FOREIGN KEY (`group_pn`) REFERENCES `regex_group` (`pn`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

/*Data for the table `regex_image` */

LOCK TABLES `regex_image` WRITE;

insert  into `regex_image`(`pn`,`group_pn`,`shape`) values (2,1,'footer'),(3,1,'header'),(4,1,'nav'),(5,1,'aside'),(6,2,'top'),(7,2,'bottom'),(12,1,'head'),(20,1,'script'),(21,1,'iframe'),(22,1,'style'),(23,1,'object'),(24,1,'meta'),(25,1,'h1'),(26,1,'h2'),(27,1,'h3'),(28,1,'h4'),(29,1,'h5'),(30,1,'h6'),(32,2,'head'),(36,2,'foot'),(38,3,'container'),(39,3,'content'),(40,3,'article'),(42,2,'banner'),(43,2,'btn'),(44,2,'advertise'),(45,2,'paging'),(46,3,'main'),(49,2,'side'),(50,1,'form'),(51,2,'toolbar'),(52,2,'pop'),(53,2,'btn'),(54,2,'menu'),(55,2,'navigation'),(56,2,'similar'),(57,2,'bar'),(58,2,'findingNemo'),(59,2,'calendar'),(60,2,'date'),(62,5,'ico'),(63,5,'btn'),(64,2,'photo'),(65,2,'left'),(66,2,'right');

UNLOCK TABLES;

/*Table structure for table `regex_title` */

DROP TABLE IF EXISTS `regex_title`;

CREATE TABLE `regex_title` (
  `pn` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `group_pn` int(11) NOT NULL COMMENT '정규표현식 그룹 종류 고유번호',
  `shape` varchar(255) NOT NULL COMMENT '정규표현식 형태',
  PRIMARY KEY (`pn`),
  KEY `regex_title_ibfk_1` (`group_pn`),
  CONSTRAINT `regex_title_ibfk_1` FOREIGN KEY (`group_pn`) REFERENCES `regex_group` (`pn`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

/*Data for the table `regex_title` */

LOCK TABLES `regex_title` WRITE;

insert  into `regex_title`(`pn`,`group_pn`,`shape`) values (6,1,'head'),(7,1,'script'),(8,1,'style'),(17,3,'title'),(18,4,'h1'),(19,4,'h2'),(20,4,'h3'),(21,4,'h4'),(22,4,'h5'),(23,4,'h6'),(24,2,'bottom'),(25,2,'banner'),(26,2,'advertise'),(27,2,'foot'),(28,2,'btn'),(29,2,'paging'),(30,2,'popup'),(31,2,'menu');

UNLOCK TABLES;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `pn` int(11) NOT NULL AUTO_INCREMENT COMMENT '사용자 고유번호',
  `id` varchar(255) NOT NULL COMMENT '구글 Oauth ID',
  `register_date` date NOT NULL COMMENT '등록날짜.',
  PRIMARY KEY (`pn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자 정보 테이블';

/*Data for the table `user` */

LOCK TABLES `user` WRITE;

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
