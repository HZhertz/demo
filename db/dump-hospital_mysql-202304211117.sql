-- MySQL dump 10.13  Distrib 5.5.40, for Win32 (x86)
--
-- Host: localhost    Database: hospital_mysql
-- ------------------------------------------------------
-- Server version	5.5.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alert`
--

DROP TABLE IF EXISTS `alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `announcement_id` int(11) NOT NULL,
  `is_alert` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0不需要弹窗 ，1需要弹窗',
  `is_read` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0未读 1已读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=gbk COMMENT='弹窗表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert`
--

LOCK TABLES `alert` WRITE;
/*!40000 ALTER TABLE `alert` DISABLE KEYS */;
INSERT INTO `alert` VALUES (3,0,3,0,0),(4,2,3,0,1),(5,0,4,1,0),(6,2,4,1,1),(7,3,4,1,1),(8,0,5,1,0),(9,3,5,1,1),(10,2,5,1,1),(11,4,5,1,1),(12,0,6,1,0),(13,2,6,1,1),(14,4,6,1,1),(15,3,6,1,1),(16,0,7,1,0),(17,2,7,1,1),(18,4,7,1,0),(19,3,7,1,1);
/*!40000 ALTER TABLE `alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=gbk COMMENT='公告表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (3,'123宿舍','<p>12312撒旦123</p>',1,'2023-03-24 10:55:04'),(4,'123123','<p>123123123</p>',1,'2023-03-24 11:10:05'),(5,'123','<p>sdsa<br/></p>',1,'2023-03-27 15:23:29'),(6,'今晚10点进行更新','<p>阿三大苏打撒旦</p><p><img src=\"/api/uploads/\\announcement\\c3255576184103d9bedce15075d4c29c\" style=\"max-width:100%;\" contenteditable=\"false\"/><br/></p>',1,'2023-03-28 23:10:43'),(7,'版本更新','<p>新增医院公告</p><p><img src=\"/api/uploads/\\announcement\\4169e28dad34df104ef4f9007bd540b7\" style=\"max-width:100%;\" contenteditable=\"false\"/><br/></p>',1,'2023-03-29 15:12:24');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL COMMENT '内容',
  `create_time` date NOT NULL COMMENT '时间',
  `sender_id` int(11) NOT NULL COMMENT '发送方',
  `receiver` int(11) NOT NULL COMMENT '接收方',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=gbk COMMENT='聊天表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,'哈哈哈哈哈，我是卖报的小行家','2023-04-14',2,1),(4,'说啥是啥','2023-04-14',3,1),(5,'123123123','2023-04-14',3,1),(6,' 你属猪','2023-04-14',2,1),(7,'我真笨','2023-04-14',2,1),(8,'1123','2023-04-14',2,1),(9,'1233','2023-04-14',2,1),(10,'测试一下','2023-04-14',2,1),(11,'123213','2023-04-14',1,2),(12,'123213','2023-04-14',1,2),(13,'我爱你','2023-04-14',1,3),(14,'嘿嘿','2023-04-14',2,1),(15,'我也爱你','2023-04-14',3,1),(16,'哈哈哈哈','2023-04-14',2,1),(17,'啊实打实的','2023-04-14',2,1),(18,'123','2023-04-14',2,1),(19,'123','2023-04-14',1,2),(20,'123','2023-04-14',1,2),(21,'你好啊','2023-04-14',1,2),(22,'你好啊','2023-04-14',1,2),(23,'asd','2023-04-14',1,2),(24,'sssss','2023-04-14',1,2),(25,'姐姐及','2023-04-14',2,1),(26,'属实是','2023-04-14',1,3),(27,'111','2023-04-14',2,1),(28,'123','2023-04-14',2,1),(29,'嘿嘿你好啊','2023-04-14',2,1),(30,'我不好','2023-04-14',2,1),(31,'你好你好','2023-04-14',1,2),(32,'hello\n','2023-04-14',1,2),(33,'123','2023-04-14',2,1),(34,'哈哈哈\n','2023-04-14',1,2),(35,'123','2023-04-14',1,2),(36,'嘘嘘嘘','2023-04-14',1,2),(37,'123','2023-04-14',1,2),(38,'import React, { Component } from \'react\'\nimport PubSub from \'pubsub-js\' // 引入 pubsub-js 第三方依赖\n\nexport default class CompB extends Component {\n\n  handleSent = () => {\n    // 通过方法触发 发布 publish 方法\n    /*\n\n      PubSub.publish 发布\n        第一个参数是 指定的 订阅名\n        第二个参数是 要传递的数据\n    */\n    PubSub.publish(\'Topic\', { a: \'Hello\' })\n  }\n\n  render() {\n    return (\n      <div className=\'comp-b\'>\n        <h1>CompB</h1>\n        <button onClick={this.handleSent}>发送数据</button>\n      </div>\n    )\n  }\n}\n\n','2023-04-14',1,2),(39,'import React, { Component } from \'react\' import PubSub from \'pubsub-js\' // 引入 pubsub-js 第三方依赖  export default class CompB extends Component {    handleSent = () => {     // 通过方法触发 发布 publish 方法     /*        PubSub.publish 发布         第一个参数是 指定的 订阅名         第二个参数是 要传递的数据     */     PubSub.publish(\'Topic\', { a: \'Hello\' })   }    render() {     return (       <div className=\'comp-b\'>         <h1>CompB</h1>         <button onClick={this.handleSent}>发送数据</button>       </div>     )   } }','2023-04-14',3,1),(40,'啦啦啦','2023-04-14',1,2),(41,'123','2023-04-14',1,2),(42,'谢谢你','2023-04-14',1,2),(43,'不客气','2023-04-14',2,1),(44,'谢谢你','2023-04-14',2,1),(45,'啊实打实的','2023-04-14',3,1),(46,'123','2023-04-14',3,1),(47,'11123谁舍得','2023-04-14',2,1),(48,'123123','2023-04-14',3,1),(49,'飒飒的','2023-04-14',2,1),(50,'123','2023-04-14',2,1),(51,'123飒飒的','2023-04-14',2,1),(52,'嘻嘻嘻嘻嘻','2023-04-14',2,1),(53,'撒打算','2023-04-14',2,1),(54,'啊沙发沙发','2023-04-14',2,1),(55,'123阿松大阿福\n','2023-04-14',1,2),(56,'阿萨大大','2023-04-14',3,1),(57,'啊沙发沙发','2023-04-14',1,3),(58,'休息休息','2023-04-14',3,1),(59,'123','2023-04-14',2,1),(60,'00000\n','2023-04-14',1,2),(61,'asd1','2023-04-15',2,1),(62,'asdas','2023-04-15',1,3),(63,'asd','2023-04-15',2,1),(64,'asd','2023-04-17',2,1),(65,'4月16日出版的第8期《求是》杂志将发表中共中央总书记、国家主席、中央军委主席习近平的重要文章《加快构建新发展格局 把握未来发展主动权》。  文章强调，我国14亿多人口整体迈进现代化社会，规模超过现有发达国家人口的总和，其艰巨性和复杂性前所未有，必须把发展的主导权牢牢掌握在自己手中；我国是一个超大规模经济体，而超大规模经济体可以也必须内部可循环。事实充分证明，加快构建新发展格局，是立足实现第二个百年奋斗目标、统筹发展和安全作出的战略决策，是把握未来发展主动权的战略部署。我们只有加快构建新发展格局，才能夯实我国经济发展的根基、增强发展的安全性稳定性，才能在各种可以预见和难以预见的狂风暴雨、惊涛骇浪中增强我国的生存力、竞争力、发展力、持续力，确保中华民族伟大复兴进程不被迟滞甚至中断，胜利实现全面建成社会主义现代化强国目标。  文章指出，两年多来，构建新发展格局扎实推进，取得了一些成效，思想共识不断凝聚、工作基础不断夯实、政策制度不断完善，但还存在一些突出问题。总体看，全面建成新发展格局还任重道远。加快构建新发展格局，要从两个维度来研究和布局：一是更有针对性地加快补上我国产业链供应链短板弱项，确保国民经济循环畅通；二是提升国内大循环内生动力和可靠性，提高国际竞争力，增强对国际循环的吸引力、推动力。  文章指出，必须坚持问题导向和系统观念，着力破除制约加快构建新发展格局的主要矛盾和问题，全面深化改革，推进实践创新、制度创新，不断扬优势、补短板、强弱项。第一，更好统筹扩大内需和深化供给侧结构性改革，增强国内大循环动力和可靠性。要把扩大内需战略同深化供给侧结构性改革有机结合起来，供需两端同时发力、协调配合，形成需求牵引供给、供给创造需求的更高水平动态平衡，实现国民经济良性循环。第二，加快科技自立自强步伐，解决外国“卡脖子”问题。第三，加快建设现代化产业体系，夯实新发展格局的产业基础。第四，全面推进城乡、区域协调发展，提高国内大循环的覆盖面。只有实现了城乡、区域协调发展，国内大循环的空间才能更广阔、成色才能更足。第五，进一步深化改革开放，增强国内外大循环的动力和活力。   加快构建新发展格局把握未来发展主动权※  习近平  加快构建新发展格局，是党的二十大提出的一项战略任务。今天，中央政治局围绕这个内容举行第2次集体学习，目的是结合学习贯彻党的二十大精神和中央经济工作会议精神，进一步加深对构建新发展格局意义的认识，分析工作中存在的问题，探讨着力破除主要矛盾、加快构建新发展格局的措施。  构建以国内大循环为主体、国内国际双循环相互促进的新发展格局，是我于2020年4月在中央财经委员会会议上首次提出的。经过两年多的实践，我们对构建新发展格局战略意义的认识是越来越深刻、思路越来越清晰了。从现在起，我们党的中心任务就是团结带领全国各族人民全面建成社会主义现代化强国、实现第二个百年奋斗目标，以中国式现代化全面推进中华民族伟大复兴。我国14亿多人口整体迈进现代化社会，规模超过现有发达国家人口的总和，其艰巨性和复杂性前所未有，必须把发展的主导权牢牢掌握在自己手中；我国是一个超大规模经济体，而超大规模经济体可以也必须内部可循环。事实充分证明，加快构建新发展格局，是立足实现第二个百年奋斗目标、统筹发展和安全作出的战略决策，是把握未来发展主动权的战略部署。我们只有加快构建新发展格局，才能夯实我国经济发展的根基、增强发展的安全性稳定性，才能在各种可以预见和难以预','2023-04-17',2,1),(66,'asasdas','2023-04-17',1,2),(67,'asfasf','2023-04-17',2,1),(68,'阿松大','2023-04-17',2,1),(69,'asd','2023-04-17',2,1),(70,'asfasf','2023-04-17',2,1),(71,'asf','2023-04-17',2,1),(72,'asf','2023-04-17',1,2),(73,'asf','2023-04-17',2,1),(74,'asd','2023-04-18',2,1),(75,'asfasf','2023-04-18',2,1),(76,'asfaf','2023-04-18',2,1),(77,'hjkbj','2023-04-18',2,1),(78,'asd','2023-04-18',2,1),(79,'as','2023-04-18',2,1),(80,'asd','2023-04-18',2,1),(81,'dfg','2023-04-18',2,1),(82,'a','2023-04-18',2,1),(83,'asf\n','2023-04-18',1,2),(84,'ad','2023-04-18',2,1),(85,'asd','2023-04-18',2,1),(86,'asd','2023-04-18',2,1),(87,'asf','2023-04-18',2,1),(88,'asd','2023-04-18',2,1),(89,'asd','2023-04-18',2,1),(90,'你好啊','2023-04-18',2,1),(91,'阿萨法发是\n','2023-04-18',1,2),(92,'阿萨法发是\n','2023-04-18',1,2);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL COMMENT '科室名',
  `introduction` text NOT NULL COMMENT '科室简介',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `expertise` text COMMENT '擅长领域',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk COMMENT='科室表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'胸外三科','首都医科大学附属北京胸科医院胸外二科成立于1955年，在辛育龄、赵志文、李世业、许绍发等国内著名胸外科专家的引领下，已经发展成为集临床、科研、教学为一体的国内著名胸外科中心。兼设北京市肺癌诊疗中心、胸部肿瘤和结核病多学科协作中心、加速康复外科培训中心，并荣获市属医院人文建设示范科室等。共设床位79张，医护人员40名（医生13名，护士26名），其中高级职称8名。胸外科组建60余年来，共完成胸外科手术近17000例，近年来四级手术例数1500例/年以上，其中肺癌手术量居北京市胸外科前列。首都医科大学外科学硕士、博士学位培养单位，现有博士生导师2人、硕士生导师4人。 \n在现任主任刘志东教授的带领下,胸部肿瘤的微创治疗水平迅速提升，2009年在国内率先开展完全胸腔镜。我科建立以刘志东教授为核心的“肺和纵隔疑难手术治疗”知名专家团队，建立院内及院外多维度MDT协作平台。在临床与基础研究方面均取得了丰硕成果，主持多项国家级及省部级课题。“胸部肿瘤侵及上腔静脉系统血管的外科治疗”项目2006荣获北京市科学技术\"二等奖\"，获得北京市“创新工作室”和“全国青年文明号”称号。\n1、联系方式 ：010-89509316','2023-03-20 12:00:00','胸部肿瘤的微创治疗水平迅速提升，2009年在国内率先开展完全胸腔镜。我科建立以刘志东教授为核心的“肺和纵隔疑难手术治疗”知名专家团队，建立院内及院外多维度MDT协作平台'),(2,'胸外二科','首都医科大学附属北京胸科医院胸外二科成立于1955年，在辛育龄、赵志文、李世业、许绍发等国内著名胸外科专家的引领下，已经发展成为集临床、科研、教学为一体的国内著名胸外科中心。兼设北京市肺癌诊疗中心、胸部肿瘤和结核病多学科协作中心、加速康复外科培训中心，并荣获市属医院人文建设示范科室等。共设床位79张，医护人员40名（医生13名，护士26名），其中高级职称8名。胸外科组建60余年来，共完成胸外科手术近17000例，近年来四级手术例数1500例/年以上，其中肺癌手术量居北京市胸外科前列。首都医科大学外科学硕士、博士学位培养单位，现有博士生导师2人、硕士生导师4人。 \n在现任主任刘志东教授的带领下,胸部肿瘤的微创治疗水平迅速提升，2009年在国内率先开展完全胸腔镜。我科建立以刘志东教授为核心的“肺和纵隔疑难手术治疗”知名专家团队，建立院内及院外多维度MDT协作平台。在临床与基础研究方面均取得了丰硕成果，主持多项国家级及省部级课题。“胸部肿瘤侵及上腔静脉系统血管的外科治疗”项目2006荣获北京市科学技术\"二等奖\"，获得北京市“创新工作室”和“全国青年文明号”称号。\n1、联系方式 ：010-89509316','2023-03-20 10:23:51','胸部肿瘤的微创治疗水平迅速提升，2009年在国内率先开展完全胸腔镜。我科建立以刘志东教授为核心的“肺和纵隔疑难手术治疗”知名专家团队，建立院内及院外多维度MDT协作平台'),(4,'胸外一科','啊u数据会被罚款垃圾双并发','2023-03-23 17:05:13','按省份可懒了是否能啦'),(5,'胸外五科','123睡得','2023-03-25 23:56:56','123123');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_name` varchar(100) NOT NULL COMMENT '医生姓名',
  `doctor_desc` text NOT NULL COMMENT '医生简介',
  `doctor_expertise` text COMMENT '擅长领域',
  `department_id` int(11) NOT NULL COMMENT '科室id',
  `professional_title` varchar(100) NOT NULL COMMENT '职称',
  `create_time` datetime DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL COMMENT '医生头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=gbk COMMENT='医生表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'赵大大','太厉害了','治死人',2,'主任医师','2023-03-21 18:02:23','/api/uploads/\\doctor\\da174e1191a70fe92bd510bd14ec304e'),(2,'陈小小','很厉害的一个医生','气胸',1,'副主任医师','2023-03-21 21:41:49','/api/uploads/\\doctor\\4b55ac16773429fdcb9d38ac07468a9f'),(7,'找学校','123','123',4,'主任医师',NULL,NULL);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_register`
--

DROP TABLE IF EXISTS `doctor_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(11) NOT NULL COMMENT '医生id',
  `sitting_time` varchar(100) NOT NULL COMMENT '坐诊时间',
  `sitting_num` int(11) NOT NULL COMMENT '当天挂号数',
  `surplus_sitting_num` int(11) NOT NULL COMMENT '剩余挂号数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=gbk COMMENT='挂号管理表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_register`
--

LOCK TABLES `doctor_register` WRITE;
/*!40000 ALTER TABLE `doctor_register` DISABLE KEYS */;
INSERT INTO `doctor_register` VALUES (14,7,'2023-04-14',1,0),(15,7,'2023-04-15',12,8),(16,2,'2023-04-14',13,13),(17,1,'2023-04-14',11,11),(18,2,'2023-04-15',2,2),(19,1,'2023-04-15',33,33),(20,1,'2023-04-13',22,21);
/*!40000 ALTER TABLE `doctor_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctorcard`
--

DROP TABLE IF EXISTS `doctorcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctorcard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '账号id',
  `relationship` varchar(100) NOT NULL COMMENT '与本人关系',
  `patient_name` varchar(100) NOT NULL COMMENT '就诊人姓名',
  `id_number` varchar(100) NOT NULL COMMENT '身份证号',
  `address` varchar(100) NOT NULL COMMENT '所在地区',
  `emergency_contact` varchar(100) DEFAULT NULL COMMENT '紧急联系人姓名',
  `emergency_phone` varchar(100) DEFAULT NULL COMMENT '紧急联系人手机号',
  `height` varchar(100) DEFAULT NULL COMMENT '身高',
  `body_weight` varchar(100) DEFAULT NULL COMMENT '体重',
  `medical_history` text COMMENT '既往病史',
  `allergy_history` text COMMENT '药物过敏史',
  `is_break` tinyint(4) NOT NULL DEFAULT '0' COMMENT '失信次数  大于3次将不能再次预约',
  PRIMARY KEY (`id`),
  UNIQUE KEY `doctorcard_un` (`id_number`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=gbk COMMENT='就诊卡';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctorcard`
--

LOCK TABLES `doctorcard` WRITE;
/*!40000 ALTER TABLE `doctorcard` DISABLE KEYS */;
INSERT INTO `doctorcard` VALUES (1,2,'本人','赵晗嘻嘻','130625200104090011','河北省保定市徐水区安肃镇','陈婧','19833190382','180','82','','',2),(6,2,'其他','赵晗晗','130625200104090017','河北省保定市徐水区安肃镇','','','','','','',0),(7,2,'子女','陈婧景','130424200102070526','河北省保定市徐水区安肃镇','赵晗啸','15631231958','180','70','','',0),(10,2,'其他','赵晗和的','130625200104090013','河北省保定市徐水区安肃镇','','','','','','',0),(11,2,'配偶','赵晗','130625200104090012','河北省保定市徐水区安肃镇','null','null','null','null','null','null',4),(12,2,'其他','赵晗你能','130625200104090019','河北省保定市徐水区安肃镇',NULL,NULL,NULL,NULL,NULL,NULL,0),(14,3,'本人','陈下','130625200104090022','123',NULL,NULL,NULL,NULL,NULL,NULL,0),(15,6,'本人','赵大帅','130625200104080011','河北省保定市徐水区安肃镇',NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `doctorcard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_announcement`
--

DROP TABLE IF EXISTS `hospital_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospital_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `image` varchar(100) NOT NULL COMMENT '公告宣传图',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `is_recommend` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否首页推荐 0否 1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=gbk COMMENT='医院公告表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_announcement`
--

LOCK TABLES `hospital_announcement` WRITE;
/*!40000 ALTER TABLE `hospital_announcement` DISABLE KEYS */;
INSERT INTO `hospital_announcement` VALUES (2,'今晚更新1','<p>今晚10点进行更新</p><p><img src=\"/api/uploads/\\hospitalAnnouncement\\83922cdd2c968c5a6f4f0e4a492097db\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>','/api/uploads/\\hospitalAnnouncement\\b5a12456d16faf9af276c7c8ee0ff627',1,'2023-03-25 15:04:55',1),(3,'123','<p>123<br/></p>','/api/uploads/\\hospitalAnnouncement\\bfd52ab243781f3dd95320f0c2270cd4',1,'2023-03-27 16:42:45',0),(4,'123','<p>sd1<br/></p>','/api/uploads/\\hospitalAnnouncement\\88169ec8ab6e1303942525d5f32efb2f',1,'2023-03-27 16:42:50',1),(5,'123','<p>sadasd<br/></p>','/api/uploads/\\hospitalAnnouncement\\10a8e4ab76f0653a765b9d0a099dbc8c',1,'2023-03-27 16:42:56',1),(6,'123','<p>12312<br/></p>','/api/uploads/\\hospitalAnnouncement\\998fe320970ad1bdbaf373c8cef1507e',1,'2023-03-27 16:43:03',1),(7,'123sad','<p>123asd<br/></p>','/api/uploads/\\hospitalAnnouncement\\463b8520cd45b13883a25343902328ff',1,'2023-03-27 16:43:09',1);
/*!40000 ALTER TABLE `hospital_announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_relation`
--

DROP TABLE IF EXISTS `registration_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registration_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorcard_id` int(11) NOT NULL COMMENT '就诊卡id',
  `doctor_register_id` int(11) NOT NULL COMMENT '挂号管理id',
  `isAppointment` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否预约 0未预约 1已预约',
  `isSeeDoctor` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否看诊 0未看诊 1已看诊',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=gbk COMMENT='挂号关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_relation`
--

LOCK TABLES `registration_relation` WRITE;
/*!40000 ALTER TABLE `registration_relation` DISABLE KEYS */;
INSERT INTO `registration_relation` VALUES (1,1,11,0,0),(3,11,11,0,0),(4,7,11,0,0),(5,14,11,0,0),(6,1,14,0,0),(7,1,12,0,0),(8,11,12,0,0),(9,12,12,0,0),(10,10,12,0,0),(11,6,11,0,0),(12,10,11,0,0),(13,6,12,0,0),(14,1,13,0,0),(15,10,13,0,0),(16,7,13,0,0),(17,6,13,0,0),(18,12,13,0,0),(19,14,13,1,0),(20,11,20,0,0),(21,1,15,0,0),(22,11,15,0,0),(23,1,16,0,0),(24,1,18,0,0),(25,1,20,1,0),(26,6,15,1,0);
/*!40000 ALTER TABLE `registration_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rotograph`
--

DROP TABLE IF EXISTS `rotograph`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rotograph` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL COMMENT '轮播图图片',
  `address` varchar(100) NOT NULL COMMENT '链接',
  `start_time` varchar(26) DEFAULT NULL COMMENT '生效时间',
  `end_time` varchar(26) DEFAULT NULL COMMENT '失效时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `title` varchar(100) NOT NULL COMMENT '标题',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=gbk COMMENT='轮播图';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rotograph`
--

LOCK TABLES `rotograph` WRITE;
/*!40000 ALTER TABLE `rotograph` DISABLE KEYS */;
INSERT INTO `rotograph` VALUES (1,'/api/uploads/\\gotograph\\06800f410e89fdea70dace0139e544a5','https://www.baidu.com','null','null','2023-03-25 23:27:17','百度',1),(7,'/api/uploads/\\gotograph\\5cc79e240352e85c974d37501ada1f46','https://www.taobao.com','null','null','2023-03-25 23:49:31','淘宝',1),(13,'/api/uploads/\\gotograph\\98e414685f5ef53c6f9f1d38d6d48e99','123','2023-03-26 03:47:49','2025-03-06 03:47:51','2023-03-27 15:47:58','123',1);
/*!40000 ALTER TABLE `rotograph` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_message`
--

DROP TABLE IF EXISTS `system_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(100) NOT NULL COMMENT '提示内容',
  `registration_relation_id` int(11) NOT NULL COMMENT '挂号关系表id',
  `create_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=gbk COMMENT='系统消息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_message`
--

LOCK TABLES `system_message` WRITE;
/*!40000 ALTER TABLE `system_message` DISABLE KEYS */;
INSERT INTO `system_message` VALUES (1,'挂号成功，请您在规定时间到达医院看诊！',8,'2023-04-11 15:51:50',2),(2,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-11，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',12,'2023-04-11 16:06:53',2),(3,'您已成功预约，预计时间为2023-04-11，请您在规定时间携带本人身份证到达医院看诊！',1,'2023-04-11 16:11:24',2),(4,'您已成功预约，预计时间为2023-04-11，请您在规定时间携带本人身份证到达医院看诊！',1,'2023-04-11 16:14:17',2),(5,'您已成功预约，预计时间为2023-04-11，请您在规定时间携带本人身份证到达医院看诊！',1,'2023-04-11 16:20:23',2),(6,'您已成功预约，预计时间为2023-04-11，请您在规定时间携带本人身份证到达医院看诊！',1,'2023-04-11 16:23:43',2),(7,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-11，请赵晗晗在规定时间携带本人身份证到达医院看诊！',13,'2023-04-11 16:28:38',2),(8,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-11 16:31:05',2),(9,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:43:57',2),(10,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:45:08',2),(11,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:46:08',2),(12,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:46:38',2),(13,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:47:29',2),(14,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:48:10',2),(15,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:49:32',2),(16,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:51:54',2),(17,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-11 17:53:11',2),(18,'您已成功帮(子女)陈婧景预约,预计时间为2023-04-12，请陈婧景在规定时间携带本人身份证到达医院看诊！',16,'2023-04-12 10:44:16',2),(19,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-12，请赵晗晗在规定时间携带本人身份证到达医院看诊！',17,'2023-04-12 10:48:53',2),(20,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-12，请赵晗晗在规定时间携带本人身份证到达医院看诊！',17,'2023-04-12 10:56:37',2),(21,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-12，请赵晗晗在规定时间携带本人身份证到达医院看诊！',17,'2023-04-12 10:57:28',2),(22,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-12，请赵晗晗在规定时间携带本人身份证到达医院看诊！',17,'2023-04-12 10:59:33',2),(23,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-12，请赵晗晗在规定时间携带本人身份证到达医院看诊！',17,'2023-04-12 11:36:59',2),(24,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-12，请赵晗晗在规定时间携带本人身份证到达医院看诊！',17,'2023-04-12 11:40:46',2),(25,'您已成功帮(其他)赵晗你能预约,预计时间为2023-04-12，请赵晗你能在规定时间携带本人身份证到达医院看诊！',18,'2023-04-12 14:37:38',2),(26,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:38:05',2),(27,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:40:00',2),(28,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:40:19',2),(29,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:46:41',2),(30,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:48:09',2),(31,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:48:43',2),(32,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:49:20',2),(33,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:50:17',2),(34,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',19,'2023-04-12 14:51:26',3),(35,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',19,'2023-04-12 14:51:45',3),(36,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:53:03',2),(37,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 14:53:44',2),(38,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 15:01:03',2),(39,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 15:01:49',2),(40,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 15:05:28',2),(41,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 15:16:07',2),(42,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',19,'2023-04-12 15:16:19',3),(43,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 15:16:43',2),(44,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',19,'2023-04-12 15:16:46',3),(45,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 15:17:39',2),(46,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',14,'2023-04-12 15:18:21',2),(47,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',19,'2023-04-12 15:18:29',3),(48,'您已成功帮(其他)赵晗啸的预约,预计时间为2023-04-12，请赵晗啸的在规定时间携带本人身份证到达医院看诊！',15,'2023-04-12 15:26:12',2),(49,'您已成功帮(子女)陈婧景预约,预计时间为2023-04-12，请陈婧景在规定时间携带本人身份证到达医院看诊！',16,'2023-04-12 15:26:30',2),(50,'您已成功帮(子女)陈婧景预约,预计时间为2023-04-12，请陈婧景在规定时间携带本人身份证到达医院看诊！',16,'2023-04-12 15:27:01',2),(51,'您已成功帮(子女)陈婧景预约,预计时间为2023-04-12，请陈婧景在规定时间携带本人身份证到达医院看诊！',16,'2023-04-12 15:27:57',2),(52,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',19,'2023-04-12 15:28:40',3),(53,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-12，请赵晗晗在规定时间携带本人身份证到达医院看诊！',17,'2023-04-12 16:45:40',2),(54,'您已成功预约，预计时间为2023-04-12，请您在规定时间携带本人身份证到达医院看诊！',19,'2023-04-12 17:50:20',3),(55,'您已成功帮(配偶)赵晗预约,预计时间为2023-04-13，请赵晗在规定时间携带本人身份证到达医院看诊！',20,'2023-04-13 10:20:52',2),(56,'您已成功预约，预计时间为2023-04-15，请您在规定时间携带本人身份证到达医院看诊！',21,'2023-04-13 14:57:44',2),(57,'您已成功帮(配偶)赵晗预约,预计时间为2023-04-15，请赵晗在规定时间携带本人身份证到达医院看诊！',22,'2023-04-13 15:17:32',2),(58,'您已成功帮(配偶)赵晗预约,预计时间为2023-04-15，请赵晗在规定时间携带本人身份证到达医院看诊！',22,'2023-04-13 15:22:47',2),(59,'您已成功预约，预计时间为2023-04-14，请您在规定时间携带本人身份证到达医院看诊！',23,'2023-04-13 15:24:14',2),(60,'您已成功预约，预计时间为2023-04-14，请您在规定时间携带本人身份证到达医院看诊！',23,'2023-04-13 15:34:07',2),(61,'您已成功取消预约，取消预约时间为2023-04-13！',23,'2023-04-13 15:34:22',2),(62,'您已成功帮(配偶)赵晗取消预约,取消预约时间为2023-04-13！',20,'2023-04-13 15:34:58',2),(63,'您已成功预约，预计时间为2023-04-14，请您在规定时间携带本人身份证到达医院看诊！',23,'2023-04-13 15:36:31',2),(64,'您已成功预约，预计时间为2023-04-15，请您在规定时间携带本人身份证到达医院看诊！',24,'2023-04-13 15:37:11',2),(65,'您已成功取消预约，取消预约时间为2023-04-13！',24,'2023-04-13 15:38:20',2),(66,'您已成功取消预约，取消预约时间为2023-04-13！',23,'2023-04-13 15:38:49',2),(87,'您为(配偶)赵晗预约未在规定时间内问诊,预约时间为2023-04-13，失约次数为1次（注：超过3次将不能预约）！',20,'2023-04-13 18:41:23',2),(88,'您为(配偶)赵晗预约未在规定时间内问诊,预约时间为2023-04-13，失约次数为2次（注：超过3次将不能预约）！',20,'2023-04-13 18:42:01',2),(89,'您已成功预约，预计时间为2023-04-13，请您在规定时间携带本人身份证到达医院看诊！',25,'2023-04-13 23:16:50',2),(90,'您为(配偶)赵晗预约未在规定时间内问诊,预约时间为2023-04-13，失约次数为3次（注：超过3次将不能预约）！',20,'2023-04-13 23:17:31',2),(91,'您已超过预约时间，预约时间为2023-04-13，失约次数为1次（注：超过3次将不能预约）！',20,'2023-04-13 23:17:31',2),(92,'您为(配偶)赵晗预约未在规定时间内问诊,预约时间为2023-04-13，失约次数为4次（注：超过3次将不能预约）！',20,'2023-04-13 23:17:50',2),(93,'您已超过预约时间，预约时间为2023-04-13，失约次数为2次（注：超过3次将不能预约）！',20,'2023-04-13 23:17:50',2),(94,'您已成功帮(其他)赵晗晗预约,预计时间为2023-04-15，请赵晗晗在规定时间携带本人身份证到达医院看诊！',26,'2023-04-14 09:32:03',2);
/*!40000 ALTER TABLE `system_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `user_rank` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户等级   0 患者 1医生',
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=gbk COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'zhaohx8','$2a$10$uB0ja.anr.H64EHMYObi1eA7HJUq9l6WDCCQ1rWhjKU0UO4aLdqgu','15631231958',1,NULL),(2,'zhaohx9','$2a$10$h.ZxZChNo5eFeSPdqwxHduJj.uda3IUgkLjXiNIoTE4nCTYzK8QnW','19833190382',0,NULL),(3,'chengjing1','$2a$10$Px4KdE953spesLtqbn22FOyLYm1ybXpGd3amtpHptT5CJ7PFbglrW','15631231957',0,NULL),(6,'zhaohx10','$2a$10$tMN9VCINpo/TuGqcayiyH.ob9H11FH89K2ThsQONLaGzLDEnX1BVW','15631231954',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hospital_mysql'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-21 11:17:24
