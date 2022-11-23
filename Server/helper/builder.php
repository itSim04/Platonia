<?php

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS users (
 user_id int(11) NOT NULL AUTO_INCREMENT,
 username varchar(100) NOT NULL,
 password varchar(100) NOT NULL,
 bio varchar(200) NOT NULL,
 email varchar(100) NOT NULL,
 birthday date DEFAULT NULL,
 join_date date NOT NULL,
 gender varchar(1) DEFAULT NULL,
 picture text DEFAULT NULL,
 banner text DEFAULT NULL,
 followings_TEMP int(11) NOT NULL DEFAULT 0,
 followers_TEMP int(11) NOT NULL DEFAULT 0,
 PRIMARY KEY (user_id),
 UNIQUE (username),
 UNIQUE (email))");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS thoughts (
  thought_id int(11) NOT NULL AUTO_INCREMENT,
  share_date datetime NOT NULL,
  edit_date varchar(16) DEFAULT NULL,
  content longtext NOT NULL,
  type tinyint(4) NOT NULL,
  owner_id int(11) NOT NULL,
  root_id int(11) DEFAULT NULL,
  platons_TEMP int(11) NOT NULL DEFAULT 0,
  likes_TEMP int(11) NOT NULL DEFAULT 0,
  opinions_TEMP int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (thought_id),
  FOREIGN KEY (owner_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (root_id) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS answers (
  user_id int(11) NOT NULL,
  thought_id int(11) NOT NULL,
  answer_date varchar(10) NOT NULL,
  option_chosen varchar(1) NOT NULL,
  PRIMARY KEY (user_id, thought_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (thought_id) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();

$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS likes (
  user_id int(11) NOT NULL,
  thought_id int(11) NOT NULL,
  like_date varchar(10) NOT NULL,
  PRIMARY KEY (user_id, thought_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (thought_id) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
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
  user_id int(11) NOT NULL,
  thought_id int(11) NOT NULL,
  platon_date varchar(10) NOT NULL,
  PRIMARY KEY (user_id, thought_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (thought_id) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE
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
  user_id int(11) NOT NULL,
  interest_id int(11) NOT NULL,
  interest_date varchar(10) NOT NULL,
  PRIMARY KEY (user_id, interest_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (interest_id) REFERENCES interests (interest_id) ON DELETE CASCADE ON UPDATE CASCADE
)");
$query->execute();



$query = $PDO->prepare("
CREATE TABLE IF NOT EXISTS options (
  thought_id int(11) NOT NULL,
  content varchar(48) NOT NULL,
  votes int(11) NOT NULL,
  PRIMARY KEY (thought_id),
  FOREIGN KEY (thought_id) REFERENCES thoughts (thought_id) ON DELETE CASCADE ON UPDATE CASCADE)");
$query->execute();