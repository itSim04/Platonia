<?php

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS users (
 user_id int(11) NOT NULL AUTO_INCREMENT,
 username varchar(100) NOT NULL,
 password varchar(100) NOT NULL,
 bio varchar(200) NOT NULL,
 email varchar(100) NOT NULL,
 birthday date NOT NULL,
 join_date date NOT NULL,
 gender varchar(1) NOT NULL,
 is_verified BOOLEAN NOT NULL DEFAULT FALSE,
 PRIMARY KEY (user_id),
 UNIQUE (username),
 UNIQUE (email))");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS thoughts (
  thought_id int(11) NOT NULL AUTO_INCREMENT,
  share_date VARCHAR(27) NOT NULL,
  edit_date varchar(16) DEFAULT NULL,
  content longtext NOT NULL,
  type tinyint(4) NOT NULL,
  owner_id int(11) NOT NULL,
  root_id int(11) DEFAULT NULL,
  PRIMARY KEY (thought_id),
  FOREIGN KEY (owner_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (root_id) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS answers (
  user_id_fk_ans int(11) NOT NULL,
  thought_id_fk_ans int(11) NOT NULL,
  answer_date varchar(10) NOT NULL,
  option_chosen varchar(1) NOT NULL,
  PRIMARY KEY (user_id_fk_ans, thought_id_fk_ans),
  FOREIGN KEY (user_id_fk_ans) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (thought_id_fk_ans) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS likes (
  user_id_fk_likes int(11) NOT NULL,
  thought_id_fk_likes int(11) NOT NULL,
  like_date varchar(10) NOT NULL,
  PRIMARY KEY (user_id_fk_likes, thought_id_fk_likes),
  FOREIGN KEY (user_id_fk_likes) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (thought_id_fk_likes) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS follows (
  user_id1 int(11) NOT NULL,
  user_id2 int(11) NOT NULL,
  follow_date date NOT NULL,
  PRIMARY KEY (user_id1, user_id2),
  FOREIGN KEY (user_id1) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id2) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("CREATE TABLE IF NOT EXISTS platons (
  user_id_fk_platons int(11) NOT NULL,
  thought_id_fk_platons int(11) NOT NULL,
  platon_date varchar(10) NOT NULL,
  PRIMARY KEY (user_id_fk_platons, thought_id_fk_platons),
  FOREIGN KEY (user_id_fk_platons) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (thought_id_fk_platons) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE
)");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS interests (
  interest_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(24) NOT NULL,
  img_src varchar(50) NOT NULL,
  participants_TEMP int(11) NOT NULL,
  PRIMARY KEY (interest_id),
  UNIQUE (name))");
$query->execute();

$query = $PDO->prepare("CREATE TABLE IF NOT EXISTS interested_in (
  user_id_fk_interested int(11) NOT NULL,
  interest_id_fk int(11) NOT NULL,
  interest_date varchar(10) NOT NULL,
  PRIMARY KEY (user_id_fk_interested, interest_id_fk),
  FOREIGN KEY (user_id_fk_interested) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (interest_id_fk) REFERENCES interests (interest_id) ON DELETE CASCADE ON UPDATE CASCADE
)");
$query->execute();



$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS options (
  thought_id_fk_options int(11) NOT NULL,
  position int(4) NOT NULL,
  content varchar(48) NOT NULL,
  votes int(11) NOT NULL,
  PRIMARY KEY (thought_id_fk_options, position),
  FOREIGN KEY (thought_id_fk_options) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();


$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS thoughts_TEMP (
  thought_id_fk_temp int(11) NOT NULL,
  likes int(11) NOT NULL,
  platons int(11) NOT NULL,
  opinions int(11) NOT NULL,
  PRIMARY KEY (thought_id_fk_temp),
  FOREIGN KEY (thought_id_fk_temp) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS users_TEMP (
  user_id_fk_temp int(11) NOT NULL,
  followers int(11) NOT NULL,
  followings int(11) NOT NULL,
  PRIMARY KEY (user_id_fk_temp),
  FOREIGN KEY (user_id_fk_temp) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("
CREATE TRIGGER IF NOT EXISTS `OnInterestEnroll` AFTER INSERT ON interested_in 
  FOR EACH ROW BEGIN

   UPDATE interests 
   SET interests.participants_TEMP = interests.participants_TEMP + 1 
   WHERE interest_id = new.interest_id_fk;
   
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnInterestUnenroll` BEFORE DELETE ON interested_in 
FOR EACH ROW BEGIN

 UPDATE interests 
 SET interests.participants_TEMP = interests.participants_TEMP - 1 
 WHERE interest_id = old.interest_id_fk;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnOpinionDelete` BEFORE DELETE ON thoughts 
FOR EACH ROW BEGIN

DELETE FROM thoughts_temp WHERE thought_id_fk_temp = old.thought_id;
UPDATE thoughts_temp 
 SET opinions = opinions - 1 
 WHERE thought_id_fk_temp = old.root_id AND thought_id_fk_temp != old.thought_id;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnOpinionInsert` AFTER INSERT ON thoughts 
FOR EACH ROW BEGIN

INSERT INTO thoughts_temp (thought_id_fk_temp) VALUES (new.thought_id);

 UPDATE thoughts_temp 
 SET opinions = opinions + 1 
 WHERE thought_id_fk_temp = new.root_id AND thought_id_fk_temp != new.thought_id;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnUserAdd` AFTER INSERT ON users 
FOR EACH ROW BEGIN

INSERT INTO users_temp (user_id_fk_temp) VALUES (new.user_id);
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnLikeDelete` BEFORE DELETE ON likes
FOR EACH ROW BEGIN

UPDATE thoughts_temp 
 SET likes = likes - 1 
 WHERE thought_id_fk_temp = old.thought_id_fk_likes;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnLikeInsert` AFTER INSERT ON likes 
FOR EACH ROW BEGIN

UPDATE thoughts_temp 
 SET likes = likes + 1 
 WHERE thought_id_fk_temp = new.thought_id_fk_likes;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnPlatonDelete` BEFORE DELETE ON platons
FOR EACH ROW BEGIN

UPDATE thoughts_temp 
 SET platons = platons - 1 
 WHERE thought_id_fk_temp = old.thought_id_fk_platons;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnPlatonInsert` AFTER INSERT ON platons 
FOR EACH ROW BEGIN

UPDATE thoughts_temp 
 SET platons = platons + 1 
 WHERE thought_id_fk_temp = new.thought_id_fk_platons;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnAnswer` AFTER INSERT ON ANSWERS
FOR EACH ROW BEGIN

UPDATE options 
 SET votes = votes + 1 
 WHERE thought_id_fk_options = new.thought_id_fk_ans AND position = new.option_chosen;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnFollow` AFTER INSERT ON follows 
FOR EACH ROW BEGIN

UPDATE users_temp 
SET followings = followings + 1
WHERE user_id_fk_temp = new.user_id1;
UPDATE users_temp 
SET followers = followers + 1
WHERE user_id_fk_temp = new.user_id2;
 
END");
$query->execute();

$query = $PDO->prepare("CREATE TRIGGER IF NOT EXISTS `OnUnfollow` BEFORE DELETE ON follows
FOR EACH ROW BEGIN

UPDATE users_temp 
SET followings = followings - 1
WHERE user_id_fk_temp = old.user_id1;
UPDATE users_temp 
SET followers = followers - 1
WHERE user_id_fk_temp = old.user_id2;
 
END");
$query->execute();