-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2025 at 10:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `soulconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin1@example.com', 'password123'),
(2, 'admin2@example.com', 'password123'),
(3, 'admin3@example.com', 'password123'),
(4, 'admin4@example.com', 'password123'),
(5, 'admin5@example.com', 'password123'),
(6, 'admin6@example.com', 'password123'),
(7, 'admin7@example.com', 'password123'),
(8, 'admin8@example.com', 'password123'),
(9, 'admin9@example.com', 'password123'),
(10, 'admin10@example.com', 'password123'),
(11, 'admin11@example.com', 'password123'),
(12, 'admin12@example.com', 'password123'),
(13, 'admin13@example.com', 'password123'),
(14, 'admin14@example.com', 'password123'),
(15, 'admin15@example.com', 'password123'),
(16, 'admin16@example.com', 'password123'),
(17, 'admin17@example.com', 'password123'),
(18, 'admin18@example.com', 'password123'),
(19, 'admin19@example.com', 'password123'),
(20, 'admin20@example.com', 'password123'),
(21, 'admin21@example.com', 'password123'),
(22, 'admin22@example.com', 'password123'),
(23, 'admin23@example.com', 'password123'),
(24, 'admin24@example.com', 'password123'),
(25, 'admin25@example.com', 'password123'),
(26, 'admin26@example.com', 'password123'),
(27, 'admin27@example.com', 'password123'),
(28, 'admin28@example.com', 'password123'),
(29, 'admin29@example.com', 'password123'),
(30, 'admin30@example.com', 'password123'),
(31, 'admin31@example.com', 'password123'),
(32, 'admin32@example.com', 'password123'),
(33, 'admin33@example.com', 'password123'),
(34, 'admin34@example.com', 'password123'),
(35, 'admin35@example.com', 'password123'),
(36, 'admin36@example.com', 'password123'),
(37, 'admin37@example.com', 'password123'),
(38, 'admin38@example.com', 'password123'),
(39, 'admin39@example.com', 'password123'),
(40, 'admin40@example.com', 'password123'),
(41, 'admin41@example.com', 'password123'),
(42, 'admin42@example.com', 'password123'),
(43, 'admin43@example.com', 'password123'),
(44, 'admin44@example.com', 'password123'),
(45, 'admin45@example.com', 'password123'),
(46, 'admin46@example.com', 'password123'),
(47, 'admin47@example.com', 'password123'),
(48, 'admin48@example.com', 'password123'),
(49, 'admin49@example.com', 'password123'),
(50, 'admin50@example.com', 'password123');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `optional` tinyint(1) NOT NULL,
  `multiple` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `optional`, `multiple`) VALUES
(1, 'One-Liner', 0, 0),
(2, 'Wat waardeer je in een partner?', 0, 0),
(3, 'Wat zoek je in een partner', 0, 0),
(6, 'Postcode', 0, 0),
(7, 'Relatie waar je over voor staat', 0, 1),
(8, 'Opleidingsniveau', 1, 1),
(9, 'Talen die je spreekt', 1, 1),
(10, 'Waarin je werkzaam bent/beroep', 1, 0),
(11, 'Nerdgehalte', 1, 1),
(12, 'Sportitviteit (hoe vaak)', 1, 0),
(13, 'Cultureel met sub-ontwerpen', 1, 1),
(14, 'Stijl', 1, 1),
(15, 'Uitgaan frequentie', 1, 0),
(16, 'Muziekstijlen', 1, 1),
(17, 'Alcohol frequentie', 1, 0),
(18, 'Huisdieren', 1, 0),
(19, 'Heeft kinderen', 1, 0),
(20, 'Kinderwens', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `category_options`
--

CREATE TABLE `category_options` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_options`
--

INSERT INTO `category_options` (`id`, `category_id`, `value`) VALUES
(1, 7, 'Vriendschappelijk'),
(2, 7, 'Vriendschap/Relatie'),
(3, 7, 'Relatie'),
(4, 7, 'Lange termijn'),
(5, 7, 'LAT'),
(6, 7, 'FWB'),
(7, 7, 'ONS'),
(8, 8, 'Universitair'),
(9, 8, 'HBO+'),
(10, 8, 'HBO'),
(11, 8, 'MBO 3-4'),
(12, 8, 'MBO-2'),
(13, 8, 'VWO'),
(14, 8, 'HAVO'),
(15, 8, 'TL'),
(16, 8, 'KB'),
(17, 8, 'BB'),
(18, 8, 'Geen'),
(19, 8, 'Anders'),
(20, 9, 'Nederlands'),
(21, 9, 'Engels'),
(22, 11, 'Computers'),
(23, 11, 'Technologie'),
(24, 11, 'Stripboeken'),
(25, 11, 'Superhelden'),
(26, 11, 'Gaming'),
(27, 11, 'Wetenschap'),
(28, 11, 'Natuur'),
(29, 11, 'Fantasy'),
(30, 11, 'Sci-Fi'),
(31, 11, 'Anime/Manga'),
(32, 11, 'Wiskunde'),
(33, 11, 'Feitjes'),
(34, 11, 'Film/Televisie'),
(35, 11, 'Kunst'),
(36, 11, 'Talen'),
(37, 11, 'Geschiedenis'),
(38, 11, 'Musical/Theater'),
(40, 13, 'Theater'),
(41, 13, 'Film'),
(43, 13, 'Musea'),
(44, 13, 'Mode'),
(45, 13, 'Musicals'),
(46, 13, 'Literatuur'),
(47, 13, 'Romans'),
(48, 13, 'Festivals'),
(49, 16, 'Pop'),
(50, 16, 'Rock'),
(51, 16, 'Hip-Hop'),
(52, 16, 'Electronic'),
(53, 16, 'R&B'),
(54, 16, 'Jazz'),
(55, 16, 'Country'),
(56, 16, 'Klassiek'),
(57, 16, 'Reggea'),
(58, 16, 'Blues'),
(59, 16, 'Metal'),
(60, 16, 'Folk'),
(61, 16, 'Gospel'),
(62, 14, 'Casual'),
(63, 14, 'Formeel'),
(64, 14, 'Streetware'),
(65, 14, 'Bohemian'),
(66, 14, 'Boho'),
(67, 14, 'Preppy'),
(68, 14, 'Grunge'),
(69, 14, 'Minimalistisch'),
(70, 14, 'Vintage'),
(71, 14, 'Retro'),
(72, 14, 'Sport'),
(73, 14, 'Cyber'),
(74, 14, 'Klederdracht'),
(75, 17, 'Dagelijks'),
(76, 17, 'Wekelijks'),
(77, 17, 'Alleen weekend'),
(78, 17, 'Alleen feestjes'),
(79, 17, 'Nooit'),
(80, 18, 'Ja'),
(81, 18, 'Nee'),
(82, 18, 'Open voor'),
(83, 19, 'Ja'),
(84, 19, 'Nee'),
(85, 20, 'Ja'),
(86, 20, 'Nee');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `liked_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `liked_user_id`) VALUES
(335, 2, 5),
(334, 5, 2),
(259, 39, 65),
(332, 39, 66),
(243, 39, 67),
(238, 39, 68),
(269, 39, 69),
(316, 39, 70),
(260, 39, 71),
(234, 39, 72),
(322, 39, 73),
(240, 39, 74),
(278, 39, 75),
(327, 39, 76),
(303, 39, 77),
(267, 39, 78),
(236, 39, 79),
(242, 39, 80),
(283, 39, 81),
(255, 39, 82),
(320, 39, 83),
(290, 39, 84),
(252, 39, 85),
(308, 39, 86),
(326, 39, 87),
(258, 39, 88),
(313, 39, 89),
(264, 39, 90),
(265, 39, 91),
(330, 39, 92),
(302, 39, 93),
(257, 39, 94),
(241, 39, 95),
(274, 39, 96),
(311, 39, 97),
(270, 39, 98),
(287, 39, 99),
(273, 39, 100),
(237, 39, 101),
(286, 39, 102),
(275, 39, 103),
(285, 39, 104),
(289, 39, 105),
(317, 39, 106),
(272, 39, 107),
(324, 39, 108),
(256, 39, 109),
(323, 39, 110),
(235, 39, 111),
(319, 39, 112),
(239, 39, 113),
(291, 39, 114),
(304, 39, 115),
(315, 39, 116),
(299, 39, 117),
(333, 39, 118),
(246, 39, 119),
(321, 39, 120),
(312, 39, 121),
(292, 39, 122),
(262, 39, 123),
(309, 39, 124),
(277, 39, 125),
(249, 39, 126),
(314, 39, 127),
(307, 39, 128),
(276, 39, 129),
(293, 39, 130),
(318, 39, 131),
(301, 39, 132),
(268, 39, 133),
(325, 39, 134),
(329, 39, 135),
(298, 39, 136),
(282, 39, 137),
(281, 39, 138),
(305, 39, 139);

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `user1_id` int(11) NOT NULL,
  `user2_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `user1_id`, `user2_id`) VALUES
(21, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `text`, `type`, `created_at`) VALUES
(1, 5, 'New Like', 'You have received a like from user 2', 'like', '2025-01-28 09:43:34');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `days` varchar(255) NOT NULL,
  `paid` float NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `title`, `days`, `paid`, `created_at`) VALUES
(1, 2, 'Gold', '20', 25, '2025-01-28 08:45:55'),
(16, 39, 'Premium', '7', 54, '2025-01-27 09:36:51');

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `total_days` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `title`, `total_days`, `description`, `value`) VALUES
(1, 'Gold', '20', 'Gold subscription', 25);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_verified_at` datetime(1) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `accepted_user_agreement` tinyint(1) NOT NULL,
  `is_suspended` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `birth_date`, `gender`, `password`, `email_verified_at`, `avatar_url`, `accepted_user_agreement`, `is_suspended`) VALUES
(2, 'noah_brown', 'noah.brown@gmail.com', '1990-07-15', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(3, 'olivia_davis', 'olivia.davis@gmail.com', '1989-08-02', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(4, 'isabella_martin', 'isabella.martin@hotmail.com', '1993-05-16', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 0),
(5, 'mason_wilson', 'mason.wilson@gmail.com', '1992-11-10', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(6, 'lucy_jackson', 'lucy.jackson@gmail.com', '1991-04-30', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(7, 'lucas_smith', 'lucas.smith@gmail.com', '1988-03-25', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(8, 'ava_thompson', 'ava.thompson@gmail.com', '1992-10-13', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(9, 'jackson_moore', 'jackson.moore@gmail.com', '1993-01-02', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 0),
(10, 'ella_williams', 'ella.williams@gmail.com', '1994-06-20', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(11, 'emily_johnson', 'emily.johnson@gmail.com', '1993-02-22', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 1),
(12, 'elijah_brown', 'elijah.brown@gmail.com', '1990-05-05', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 1),
(13, 'charlotte_smith', 'charlotte.smith@gmail.com', '1992-11-18', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(14, 'daniel_lee', 'daniel.lee@gmail.com', '1991-03-12', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(15, 'mia_evans', 'mia.evans@gmail.com', '1990-12-28', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 0),
(16, 'henry_martin', 'henry.martin@gmail.com', '1993-10-08', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 0),
(17, 'grace_taylor', 'grace.taylor@gmail.com', '1991-05-07', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(18, 'william_moore', 'william.moore@gmail.com', '1994-02-17', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 1),
(19, 'chloe_jackson', 'chloe.jackson@gmail.com', '1992-01-30', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(20, 'aiden_thompson', 'aiden.thompson@gmail.com', '1990-09-12', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(21, 'sophia_williams', 'sophia.williams@gmail.com', '1994-04-18', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 1),
(22, 'logan_miller', 'logan.miller@gmail.com', '1991-11-28', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(23, 'matthew_davis', 'matthew.davis@gmail.com', '1992-04-04', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(24, 'zachary_brown', 'zachary.brown@gmail.com', '1993-08-22', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(25, 'elena_smith', 'elena.smith@gmail.com', '1991-12-25', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(26, 'sebastian_johnson', 'sebastian.johnson@gmail.com', '1994-10-13', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 1),
(27, 'victoria_evans', 'victoria.evans@gmail.com', '1992-02-16', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 0),
(28, 'logan_brown', 'logan.brown@gmail.com', '1991-08-17', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 0),
(29, 'scarlett_martin', 'scarlett.martin@gmail.com', '1990-03-22', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 0),
(30, 'joseph_wilson', 'joseph.wilson@gmail.com', '1993-07-21', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(31, 'gracie_jones', 'gracie.jones@gmail.com', '1990-09-06', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 1),
(32, 'william_wilson', 'william.wilson@gmail.com', '1988-07-29', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 0),
(33, 'sophie_jones', 'sophie.jones@gmail.com', '1994-03-21', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 0),
(34, 'benjamin_smith', 'benjamin.smith@gmail.com', '1993-04-03', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(35, 'chloe_brown', 'chloe.brown@gmail.com', '1994-11-07', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(36, 'zachary_taylor', 'zachary.taylor@gmail.com', '1991-10-30', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(37, 'ella_davis', 'ella.davis@gmail.com', '1990-04-11', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 1, 1),
(38, 'elizabeth_brown', 'elizabeth.brown@gmail.com', '1991-12-10', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(39, 'toby_jones', 'toby.jones@gmail.com', '1993-05-09', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 1),
(40, 'grace_evans', 'grace.evans@gmail.com', '1994-01-28', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(41, 'liam_moore', 'liam.moore@gmail.com', '1993-06-14', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(42, 'ella_martin', 'ella.martin@gmail.com', '1994-08-12', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(43, 'lucas_williams', 'lucas.williams@gmail.com', '1991-07-15', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(44, 'sophia_evans', 'sophia.evans@gmail.com', '1993-05-29', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(45, 'isabella_johnson', 'isabella.johnson@gmail.com', '1991-03-06', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(46, 'oliver_davis', 'oliver.davis@gmail.com', '1992-08-01', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(47, 'harper_martin', 'harper.martin@gmail.com', '1994-03-08', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(48, 'aiden_wilson', 'aiden.wilson@gmail.com', '1993-02-14', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 0, 1),
(49, 'elizabeth_jones', 'elizabeth.jones@gmail.com', '1992-06-10', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(50, 'willow_smith', 'willow.smith@gmail.com', '1994-07-05', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 0),
(51, 'sophia_perez', 'sophia.perez@gmail.com', '1993-12-21', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(52, 'ethan_clark', 'ethan.clark@gmail.com', '1992-04-12', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(53, 'ava_turner', 'ava.turner@gmail.com', '1993-02-03', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(54, 'mason_allen', 'mason.allen@gmail.com', '1991-05-18', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(55, 'isabella_harris', 'isabella.harris@gmail.com', '1994-01-25', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(56, 'jackson_lewis', 'jackson.lewis@gmail.com', '1993-09-07', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(57, 'mia_walker', 'mia.walker@gmail.com', '1991-04-20', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(58, 'oliver_hall', 'oliver.hall@gmail.com', '1994-12-11', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(59, 'amelia_scott', 'amelia.scott@gmail.com', '1992-08-28', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(60, 'lucas_young', 'lucas.young@gmail.com', '1993-05-06', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(61, 'charlotte_king', 'charlotte.king@gmail.com', '1994-07-19', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(62, 'elijah_wright', 'elijah.wright@gmail.com', '1993-11-30', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(63, 'harper_hill', 'harper.hill@gmail.com', '1992-02-14', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(64, 'james_green', 'james.green@gmail.com', '1993-10-29', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(65, 'lily_adams', 'lily.adams@gmail.com', '1994-02-17', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(66, 'benjamin_baker', 'benjamin.baker@gmail.com', '1992-06-23', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(67, 'chloe_nelson', 'chloe.nelson@gmail.com', '1994-04-03', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(68, 'alexander_carter', 'alexander.carter@gmail.com', '1993-06-17', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(69, 'zoe_mitchell', 'zoe.mitchell@gmail.com', '1992-11-03', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(70, 'henry_perez', 'henry.perez@gmail.com', '1991-08-28', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(71, 'ella_roberts', 'ella.roberts@gmail.com', '1993-02-16', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(72, 'sebastian_lopez', 'sebastian.lopez@gmail.com', '1992-10-14', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(73, 'victoria_scott', 'victoria.scott@gmail.com', '1994-03-27', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(74, 'daniel_evans', 'daniel.evans@gmail.com', '1991-07-10', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(75, 'emily_young', 'emily.young@gmail.com', '1994-11-05', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(76, 'joseph_hall', 'joseph.hall@gmail.com', '1993-09-02', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(77, 'grace_moore', 'grace.moore@gmail.com', '1992-12-19', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(78, 'matthew_johnson', 'matthew.johnson@gmail.com', '1991-01-05', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(79, 'madeline_garcia', 'madeline.garcia@gmail.com', '1994-09-26', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(80, 'logan_davis', 'logan.davis@gmail.com', '1993-11-02', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(81, 'hannah_wilson', 'hannah.wilson@gmail.com', '1991-08-15', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(82, 'matthew_martinez', 'matthew.martinez@gmail.com', '1992-05-01', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(83, 'avery_thompson', 'avery.thompson@gmail.com', '1994-07-11', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(84, 'levi_garcia', 'levi.garcia@gmail.com', '1991-12-02', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(85, 'mila_davis', 'mila.davis@gmail.com', '1994-06-22', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(86, 'william_hernandez', 'william.hernandez@gmail.com', '1993-07-16', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(87, 'maya_lee', 'maya.lee@gmail.com', '1992-03-04', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(88, 'samuel_adams', 'samuel.adams@gmail.com', '1994-05-17', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(89, 'layla_young', 'layla.young@gmail.com', '1993-09-28', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(90, 'gabriel_brown', 'gabriel.brown@gmail.com', '1992-02-21', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(91, 'aria_harris', 'aria.harris@gmail.com', '1991-01-09', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(92, 'david_clark', 'david.clark@gmail.com', '1993-10-10', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(93, 'elena_martinez', 'elena.martinez@gmail.com', '1992-01-19', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(94, 'leonard_evans', 'leonard.evans@gmail.com', '1993-08-04', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(95, 'zoe_king', 'zoe.king@gmail.com', '1994-08-21', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(96, 'michael_scott', 'michael.scott@gmail.com', '1992-03-29', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(97, 'olivia_johnson', 'olivia.johnson@gmail.com', '1994-10-08', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(98, 'sebastian_moore', 'sebastian.moore@gmail.com', '1993-02-09', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(99, 'maria_hall', 'maria.hall@gmail.com', '1992-05-19', 'Female', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedEFPHxJhNcbqKTMC_8k3zPdnSd6FZweT5g&s', 0, 1),
(100, 'leo_jackson', 'leo.jackson@gmail.com', '1991-09-11', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '2025-01-18 14:30:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0),
(101, 'anyway231', 'member@gmail.com', '2004-05-12', 'Male', '$2a$10$PQYzRP6CPeFcu/nsGd3/EuZRO1S0c6Ud9EZMGk14eztbWItWYaJKa', '0000-00-00 00:00:00.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNttH00UnZ-tIj4guMxdSHmjjokk7EdXD0w&s', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `__chat_users`
--

CREATE TABLE `__chat_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__chat_users`
--

INSERT INTO `__chat_users` (`id`, `user_id`, `chat_id`) VALUES
(1, 2, 533732),
(2, 5, 533732);

-- --------------------------------------------------------

--
-- Table structure for table `__user_categories`
--

CREATE TABLE `__user_categories` (
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__user_categories`
--

INSERT INTO `__user_categories` (`user_id`, `category_id`, `value`) VALUES
(40, 17, 'Alleen weekend'),
(40, 17, 'Nooit'),
(40, 14, 'Formeel'),
(40, 11, 'Musical/Theater'),
(41, 7, 'Vriendschap/Relatie'),
(42, 14, 'Casual'),
(42, 7, 'Vriendschappelijk'),
(42, 11, 'Kunst'),
(42, 17, 'Dagelijks'),
(42, 18, 'Nee'),
(43, 7, 'FWB'),
(44, 16, 'Folk'),
(44, 16, 'Jazz'),
(45, 16, 'Pop'),
(45, 20, 'Ja'),
(45, 13, 'Romans'),
(46, 17, 'Dagelijks'),
(47, 14, 'Bohemian'),
(47, 7, 'ONS'),
(47, 14, 'Formeel'),
(48, 20, 'Ja'),
(48, 7, 'Relatie'),
(48, 11, 'Geschiedenis'),
(49, 8, 'MBO 3-4'),
(49, 14, 'Grunge'),
(49, 14, 'Retro'),
(49, 13, 'Musea'),
(50, 14, 'Sport'),
(51, 8, 'Universitair'),
(51, 11, 'Feitjes'),
(51, 11, 'Film/Televisie'),
(51, 14, 'Retro'),
(51, 13, 'Film'),
(52, 13, 'Musea'),
(52, 8, 'Geen'),
(52, 8, 'HAVO'),
(52, 14, 'Klederdracht'),
(53, 13, 'Mode'),
(54, 14, 'Sport'),
(54, 11, 'Wiskunde'),
(54, 16, 'Hip-Hop'),
(54, 16, 'Blues'),
(55, 16, 'Folk'),
(55, 19, 'Ja'),
(55, 20, 'Ja'),
(55, 18, 'Ja'),
(55, 13, 'Film'),
(56, 8, 'HBO+'),
(56, 13, 'Literatuur'),
(56, 13, 'Film'),
(56, 11, 'Musical/Theater'),
(57, 7, 'FWB'),
(58, 14, 'Formeel'),
(58, 17, 'Alleen weekend'),
(58, 8, 'Geen'),
(58, 17, 'Dagelijks'),
(58, 13, 'Festivals'),
(59, 16, 'Jazz'),
(59, 16, 'Rock'),
(59, 8, 'HBO'),
(60, 8, 'HBO'),
(60, 8, 'HBO+'),
(60, 14, 'Grunge'),
(60, 8, 'BB'),
(61, 16, 'Blues'),
(61, 20, 'Ja'),
(61, 13, 'Mode'),
(62, 17, 'Alleen weekend'),
(62, 16, 'Folk'),
(62, 14, 'Sport'),
(62, 7, 'Lange termijn'),
(62, 16, 'Blues'),
(63, 8, 'MBO 3-4'),
(63, 17, 'Alleen feestjes'),
(63, 17, 'Wekelijks'),
(63, 8, 'HAVO'),
(63, 11, 'Computers'),
(64, 16, 'Jazz'),
(64, 11, 'Sci-Fi'),
(64, 16, 'Hip-Hop'),
(65, 14, 'Bohemian'),
(66, 7, 'LAT'),
(66, 8, 'MBO-2'),
(66, 20, 'Ja'),
(66, 17, 'Alleen weekend'),
(66, 11, 'Feitjes'),
(67, 16, 'Metal'),
(67, 14, 'Grunge'),
(67, 16, 'Hip-Hop'),
(68, 8, 'HAVO'),
(68, 13, 'Literatuur'),
(68, 18, 'Open voor'),
(68, 19, 'Ja'),
(68, 8, 'VWO'),
(69, 14, 'Cyber'),
(69, 16, 'R&B'),
(70, 16, 'Electronic'),
(70, 7, 'Lange termijn'),
(71, 17, 'Wekelijks'),
(71, 11, 'Stripboeken'),
(71, 16, 'Jazz'),
(72, 13, 'Musicals'),
(72, 18, 'Open voor'),
(72, 19, 'Ja'),
(72, 16, 'Rock'),
(72, 7, 'Vriendschap/Relatie'),
(73, 13, 'Musicals'),
(73, 8, 'KB'),
(74, 16, 'Country'),
(74, 11, 'Technologie'),
(74, 18, 'Nee'),
(74, 14, 'Streetware'),
(74, 8, 'Universitair'),
(75, 16, 'R&B'),
(75, 8, 'Anders'),
(76, 14, 'Casual'),
(76, 11, 'Talen'),
(77, 16, 'Klassiek'),
(77, 16, 'Rock'),
(77, 14, 'Preppy'),
(77, 16, 'Country'),
(78, 17, 'Nooit'),
(78, 17, 'Alleen weekend'),
(78, 7, 'ONS'),
(79, 19, 'Nee'),
(79, 14, 'Minimalistisch'),
(79, 16, 'Hip-Hop'),
(80, 19, 'Ja'),
(80, 16, 'Hip-Hop'),
(80, 16, 'Reggea'),
(81, 16, 'Rock'),
(81, 7, 'LAT'),
(81, 13, 'Literatuur'),
(81, 11, 'Musical/Theater'),
(81, 19, 'Nee'),
(82, 14, 'Retro'),
(82, 11, 'Feitjes'),
(83, 20, 'Nee'),
(83, 19, 'Ja'),
(83, 20, 'Ja'),
(83, 8, 'HBO+'),
(83, 13, 'Literatuur'),
(84, 14, 'Vintage'),
(84, 8, 'HAVO'),
(85, 17, 'Dagelijks'),
(85, 16, 'Folk'),
(86, 11, 'Wiskunde'),
(86, 14, 'Streetware'),
(87, 8, 'Universitair'),
(87, 14, 'Formeel'),
(88, 8, 'VWO'),
(89, 11, 'Kunst'),
(90, 13, 'Musicals'),
(90, 8, 'VWO'),
(90, 19, 'Nee'),
(91, 14, 'Streetware'),
(92, 19, 'Nee'),
(92, 13, 'Literatuur'),
(93, 14, 'Boho'),
(94, 14, 'Grunge'),
(94, 8, 'HAVO'),
(95, 14, 'Sport'),
(95, 14, 'Boho'),
(95, 13, 'Musicals'),
(95, 8, 'HAVO'),
(95, 11, 'Technologie'),
(96, 16, 'Blues'),
(96, 8, 'Anders'),
(96, 8, 'MBO 3-4'),
(96, 11, 'Wetenschap'),
(97, 14, 'Bohemian'),
(97, 13, 'Film'),
(97, 14, 'Sport'),
(97, 13, 'Literatuur'),
(98, 8, 'HBO'),
(99, 17, 'Alleen feestjes'),
(99, 14, 'Streetware'),
(99, 14, 'Retro'),
(100, 11, 'Superhelden'),
(100, 14, 'Grunge'),
(101, 17, 'Dagelijks'),
(102, 8, 'HBO+'),
(102, 14, 'Boho'),
(103, 11, 'Talen'),
(103, 19, 'Nee'),
(103, 18, 'Nee'),
(103, 14, 'Grunge'),
(104, 11, 'Anime/Manga'),
(105, 17, 'Wekelijks'),
(106, 11, 'Anime/Manga'),
(106, 19, 'Nee'),
(107, 19, 'Nee'),
(107, 8, 'BB'),
(108, 11, 'Anime/Manga'),
(108, 8, 'TL'),
(109, 13, 'Theater'),
(109, 18, 'Ja'),
(109, 16, 'Gospel'),
(109, 8, 'MBO-2'),
(110, 11, 'Musical/Theater'),
(110, 14, 'Minimalistisch'),
(111, 7, 'Vriendschap/Relatie'),
(111, 8, 'TL'),
(111, 14, 'Boho'),
(111, 11, 'Wiskunde'),
(111, 11, 'Feitjes'),
(112, 19, 'Nee'),
(112, 8, 'MBO-2'),
(112, 16, 'Country'),
(112, 7, 'LAT'),
(112, 8, 'Anders'),
(113, 8, 'HBO'),
(113, 11, 'Technologie'),
(114, 8, 'Geen'),
(114, 14, 'Bohemian'),
(115, 7, 'ONS'),
(115, 11, 'Gaming'),
(115, 20, 'Ja'),
(116, 13, 'Mode'),
(117, 7, 'Relatie'),
(117, 8, 'Anders'),
(117, 11, 'Fantasy'),
(118, 17, 'Alleen weekend'),
(119, 16, 'Hip-Hop'),
(119, 13, 'Theater'),
(119, 13, 'Mode'),
(119, 14, 'Bohemian'),
(119, 13, 'Festivals'),
(120, 11, 'Fantasy'),
(121, 14, 'Boho'),
(122, 13, 'Musicals'),
(122, 8, 'BB'),
(122, 16, 'Klassiek'),
(122, 11, 'Geschiedenis'),
(122, 8, 'TL'),
(123, 16, 'Country'),
(123, 11, 'Anime/Manga'),
(123, 7, 'LAT'),
(123, 14, 'Streetware'),
(124, 13, 'Romans'),
(124, 11, 'Geschiedenis'),
(124, 16, 'Reggea'),
(124, 11, 'Gaming'),
(125, 19, 'Nee'),
(125, 16, 'Electronic'),
(126, 16, 'Rock'),
(126, 8, 'Universitair'),
(126, 8, 'MBO 3-4'),
(126, 11, 'Technologie'),
(126, 19, 'Ja'),
(127, 8, 'HBO'),
(128, 14, 'Minimalistisch'),
(129, 11, 'Fantasy'),
(130, 8, 'HBO'),
(130, 11, 'Musical/Theater'),
(130, 11, 'Wetenschap'),
(130, 8, 'Geen'),
(131, 8, 'HAVO'),
(131, 11, 'Stripboeken'),
(132, 11, 'Computers'),
(133, 11, 'Geschiedenis'),
(133, 8, 'BB'),
(134, 11, 'Talen'),
(134, 16, 'Blues'),
(134, 11, 'Musical/Theater'),
(134, 14, 'Klederdracht'),
(134, 7, 'Lange termijn'),
(135, 11, 'Natuur'),
(136, 16, 'Jazz'),
(137, 18, 'Nee'),
(137, 20, 'Ja'),
(137, 8, 'HAVO'),
(138, 14, 'Sport'),
(139, 11, 'Computers'),
(139, 14, 'Sport'),
(39, 1, 'dfdsfs'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 7, 'Vriendschap/Relatie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 11, 'Technologie'),
(39, 13, 'Musea'),
(39, 13, 'Musea'),
(39, 16, 'Hip-Hop'),
(39, 16, 'Hip-Hop'),
(39, 17, 'Dagelijks'),
(39, 18, 'Open voor'),
(2, 7, 'Vriendschap/Relatie'),
(2, 7, 'Lange termijn');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_options`
--
ALTER TABLE `category_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_options_ibfk_1` (`category_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_ibfk_1` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_unique_likes` (`user_id`,`liked_user_id`),
  ADD KEY `likes_ibfk_1` (`user_id`),
  ADD KEY `likes_ibfk_2` (`liked_user_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_ibfk_1` (`chat_id`),
  ADD KEY `messages_ibfk_2` (`sender_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_ibfk_1` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_ibfk_1` (`user_id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `__chat_users`
--
ALTER TABLE `__chat_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `__chat_users_ibfk_1` (`user_id`),
  ADD KEY `__chat_users_ibfk_2` (`chat_id`);

--
-- Indexes for table `__user_categories`
--
ALTER TABLE `__user_categories`
  ADD KEY `__user_categories_ibfk_1` (`user_id`),
  ADD KEY `__user_categories_ibfk_2` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `category_options`
--
ALTER TABLE `category_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=336;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `__chat_users`
--
ALTER TABLE `__chat_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
