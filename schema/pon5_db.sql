-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 16, 2024 at 05:34 PM
-- Server version: 8.1.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `pon5_db`
--

CREATE TABLE `users` (
  `id`          int UNSIGNED NOT NULL AUTO_INCREMENT,
  `num_uploads` int UNSIGNED NOT NULL DEFAULT '0',
  `join_ts`     timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email`       varchar(64)  NOT NULL,
  `name`        varchar(32)  NOT NULL,
  `salt`        varchar(24)  NOT NULL,
  `hash`        varchar(32)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `videos` (
  `id`          int UNSIGNED NOT NULL AUTO_INCREMENT,
  `views`       int UNSIGNED NOT NULL DEFAULT '0',
  `likes`       int UNSIGNED NOT NULL DEFAULT '0',
  `dislikes`    int UNSIGNED NOT NULL DEFAULT '0',
  `timestamp`   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uploader_id` int UNSIGNED NOT NULL DEFAULT '0',
  `title`       varchar(30)  NOT NULL,
  `description` varchar(300) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (uploader_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

COMMIT;
