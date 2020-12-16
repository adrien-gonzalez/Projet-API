-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 16 déc. 2020 à 12:36
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `api_games_servers`
--
CREATE DATABASE IF NOT EXISTS `api_games_servers` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `api_games_servers`;

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_fk` int(11) NOT NULL,
  `servers_fk` int(11) NOT NULL,
  `comment` text NOT NULL,
  `score` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_fk` (`servers_fk`),
  KEY `users_fk` (`users_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `games_tags`
--

DROP TABLE IF EXISTS `games_tags`;
CREATE TABLE IF NOT EXISTS `games_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `games_fk` int(11) NOT NULL,
  `tags_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `games_fk` (`games_fk`),
  KEY `tags_fk` (`tags_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `image_servers`
--

DROP TABLE IF EXISTS `image_servers`;
CREATE TABLE IF NOT EXISTS `image_servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `servers_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_fk` (`servers_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `servers`
--

DROP TABLE IF EXISTS `servers`;
CREATE TABLE IF NOT EXISTS `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `discord` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `games_fk` int(11) NOT NULL,
  `description` text NOT NULL,
  `users_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `games_fk` (`games_fk`),
  KEY `users_fk` (`users_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `servers_tags`
--

DROP TABLE IF EXISTS `servers_tags`;
CREATE TABLE IF NOT EXISTS `servers_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `servers_fk` int(11) NOT NULL,
  `tags_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_fk` (`servers_fk`),
  KEY `tags_fk` (`tags_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture_profil` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`servers_fk`) REFERENCES `servers` (`id`),
  ADD CONSTRAINT `avis_ibfk_2` FOREIGN KEY (`users_fk`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `games_tags`
--
ALTER TABLE `games_tags`
  ADD CONSTRAINT `games_tags_ibfk_1` FOREIGN KEY (`games_fk`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `games_tags_ibfk_2` FOREIGN KEY (`tags_fk`) REFERENCES `tags` (`id`);

--
-- Contraintes pour la table `image_servers`
--
ALTER TABLE `image_servers`
  ADD CONSTRAINT `image_servers_ibfk_1` FOREIGN KEY (`servers_fk`) REFERENCES `servers` (`id`);

--
-- Contraintes pour la table `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`games_fk`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `servers_ibfk_2` FOREIGN KEY (`users_fk`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `servers_tags`
--
ALTER TABLE `servers_tags`
  ADD CONSTRAINT `servers_tags_ibfk_1` FOREIGN KEY (`servers_fk`) REFERENCES `servers` (`id`),
  ADD CONSTRAINT `servers_tags_ibfk_2` FOREIGN KEY (`tags_fk`) REFERENCES `tags` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
