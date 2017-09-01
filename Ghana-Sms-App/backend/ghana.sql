-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2017 at 02:50 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ghana`
--

-- --------------------------------------------------------

--
-- Table structure for table `dispatch_status`
--

CREATE TABLE `dispatch_status` (
  `dispatch_status_id` int(11) NOT NULL,
  `dispatch_status_name` varchar(45) NOT NULL,
  `created_on` datetime NOT NULL,
  `last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dispatch_status`
--

INSERT INTO `dispatch_status` (`dispatch_status_id`, `dispatch_status_name`, `created_on`, `last_update`) VALUES
(1, 'sent', '2017-06-01 00:00:00', '2017-06-01 00:00:00'),
(2, 'received', '2017-05-31 00:00:00', '2017-05-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_title` text NOT NULL,
  `event_excerpt` text NOT NULL,
  `event_body` text NOT NULL,
  `event_type` int(11) NOT NULL COMMENT '0 for events, 1 for news',
  `last_update` datetime NOT NULL,
  `created_on` datetime NOT NULL,
  `dispatch_status_id` int(11) NOT NULL,
  `event_user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_title`, `event_excerpt`, `event_body`, `event_type`, `last_update`, `created_on`, `dispatch_status_id`, `event_user_id`) VALUES
(1, 'Launch Event for SMS App', 'An event is planned to launch the SMS App for Ghana trainees on 5th June, 16:00 Local Time at Venue XYZ', 'Just some lorem ipsum body', 0, '2017-06-22 18:09:32', '2017-05-31 07:00:00', 1, 1234567890000),
(2, 'Workshop to be held for training of Ghana trainees', 'Venue: xyz\r\nTime: xyz', 'new test body', 0, '2017-06-01 00:00:00', '2017-05-31 00:00:00', 2, 1234567890000),
(3, 'Test event', 'blah blah blah', 'Just some test body here', 1, '2017-06-22 18:10:41', '2017-06-22 00:00:00', 2, 123456789000),
(8, 'Pakistan Wins Champions Trophy', 'What an astonishing win for Pakistan', 'What an astonishing win for Pakistan. Pakistan blasted India away from the tournament to be crowned the champions in the shorter format of the game. Internal peace and bliss brought to the fans! :D', 1, '2017-06-22 21:13:20', '2017-06-22 21:13:20', 1, 123456789000);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL,
  `cnic` bigint(20) NOT NULL,
  `current_session_id` text,
  `last_login` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `created_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `cnic`, `current_session_id`, `last_login`, `last_update`, `created_on`) VALUES
(1, 1234567890000, '10', '2017-05-30 20:43:37', '2017-05-30 20:43:37', '2017-05-30 00:00:00'),
(23, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 14:10:16'),
(24, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 14:12:34'),
(25, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 14:16:19'),
(26, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 14:31:30'),
(27, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 14:33:39'),
(28, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 14:34:29'),
(29, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 14:51:53'),
(30, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:19:43'),
(31, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:26:53'),
(32, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:28:18'),
(33, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:30:39'),
(34, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:31:13'),
(35, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:48:32'),
(36, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:50:19'),
(37, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:51:03'),
(38, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 16:53:13'),
(39, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 17:08:29'),
(40, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-22 17:09:02'),
(41, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-23 06:32:26'),
(42, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-23 07:17:11'),
(43, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-23 07:27:02'),
(44, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-23 07:39:32'),
(45, 123456789000, NULL, '2017-06-22 14:05:03', '2017-06-22 14:05:03', '2017-06-23 07:41:07');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_user_id` bigint(20) NOT NULL,
  `receiver_user_id` bigint(20) NOT NULL,
  `message_type_id` int(11) NOT NULL,
  `message_subtype_id` int(11) NOT NULL,
  `message_category` text,
  `message_body` text,
  `sent_at` datetime DEFAULT NULL,
  `received_at` datetime DEFAULT NULL,
  `delete_status` tinyint(1) DEFAULT NULL,
  `message_status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `sender_user_id`, `receiver_user_id`, `message_type_id`, `message_subtype_id`, `message_category`, `message_body`, `sent_at`, `received_at`, `delete_status`, `message_status_id`) VALUES
(1, 123456789000, 0, 1, 1, 'Technical Assistance', 'Technical Assistance Required\r\n\r\nHello there. I\'m working on a project. need some advice on it. can you help?', '2017-05-30 00:00:00', '2017-05-30 00:00:00', NULL, 1),
(2, 1234567890000, 0, 1, 1, 'Uncategorized', 'Hello World!', '2017-05-30 00:00:00', '2017-06-18 12:15:02', NULL, 1),
(3, 123456789000, 0, 1, 1, 'dsfsfdsfdf', 'Technical Assistance Required\r\n\r\nHello there. I\'m working on a project. need some advice on it. can you help?', '2017-06-01 00:00:00', '2017-06-01 00:00:00', NULL, 2),
(4, 0, 123456789000, 2, 2, 'Technical Assistance', 'Roger that. We can provide help as soon as you tell us some more details about your project.\nAwaiting your response!', '2017-06-23 04:58:17', NULL, NULL, 1),
(6, 0, 123456789000, 2, 1, 'Meetup', 'I was planning a meetup and was wondering if you\'d join us. You down?', '2017-06-23 06:26:51', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `message_status`
--

CREATE TABLE `message_status` (
  `message_status_id` int(11) NOT NULL,
  `message_status_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message_status`
--

INSERT INTO `message_status` (`message_status_id`, `message_status_name`) VALUES
(1, 'sent'),
(2, 'received');

-- --------------------------------------------------------

--
-- Table structure for table `message_subtype`
--

CREATE TABLE `message_subtype` (
  `message_subtype_id` int(11) NOT NULL,
  `message_subtype_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message_subtype`
--

INSERT INTO `message_subtype` (`message_subtype_id`, `message_subtype_name`) VALUES
(1, 'unread'),
(2, 'read');

-- --------------------------------------------------------

--
-- Table structure for table `message_type`
--

CREATE TABLE `message_type` (
  `message_type_id` int(11) NOT NULL,
  `message_type_name` varchar(45) NOT NULL,
  `created_on` datetime NOT NULL,
  `last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message_type`
--

INSERT INTO `message_type` (`message_type_id`, `message_type_name`, `created_on`, `last_update`) VALUES
(1, 'inbox', '2017-05-30 00:00:00', '2017-05-30 00:00:00'),
(2, 'outbox', '2017-05-30 01:12:00', '2017-05-30 01:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `cnic` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` mediumtext NOT NULL,
  `email` text NOT NULL,
  `last_update` datetime NOT NULL,
  `created_on` datetime NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`cnic`, `full_name`, `date_of_birth`, `phone_number`, `email`, `last_update`, `created_on`, `password`, `user_type`) VALUES
(0, 'default_web_user', '1993-12-01', '0', 'test@gmail.com', '2017-05-31 00:00:00', '2017-05-31 00:00:00', '3fc0a7acf087f549ac2b266baf94b8b1', 1),
(2, 'hello', '1997-05-24', '1122345', 'haha@gmail.com', '2017-05-30 00:00:00', '2017-05-30 00:00:00', '5d41402abc4b2a76b9719d911017c592', 0),
(123456789000, 'Test Subject', '2005-05-29', '+92-300-1234567', 'testsubject@gmail.com', '2017-05-29 21:25:00', '2017-05-29 21:00:00', '3fc0a7acf087f549ac2b266baf94b8b1', 0),
(1234567890000, 'Web Operator', '2000-07-07', '+92-314-7779852', 'web.operator@gmail.com', '2017-05-30 00:00:00', '2017-05-30 00:00:00', '3fc0a7acf087f549ac2b266baf94b8b1', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dispatch_status`
--
ALTER TABLE `dispatch_status`
  ADD PRIMARY KEY (`dispatch_status_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `dispatch_status_idx` (`dispatch_status_id`),
  ADD KEY `event_user_idx` (`event_user_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `users_login_idx` (`cnic`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `message_type_idx` (`message_type_id`),
  ADD KEY `message_subtype_idx` (`message_subtype_id`),
  ADD KEY `message_status_idx` (`message_status_id`),
  ADD KEY `sender_user_idx` (`sender_user_id`),
  ADD KEY `receiver_details_user_idx` (`receiver_user_id`);

--
-- Indexes for table `message_status`
--
ALTER TABLE `message_status`
  ADD PRIMARY KEY (`message_status_id`);

--
-- Indexes for table `message_subtype`
--
ALTER TABLE `message_subtype`
  ADD PRIMARY KEY (`message_subtype_id`);

--
-- Indexes for table `message_type`
--
ALTER TABLE `message_type`
  ADD PRIMARY KEY (`message_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`cnic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `dispatch_status` FOREIGN KEY (`dispatch_status_id`) REFERENCES `dispatch_status` (`dispatch_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `event_user` FOREIGN KEY (`event_user_id`) REFERENCES `users` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `users_login` FOREIGN KEY (`cnic`) REFERENCES `users` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `message_status` FOREIGN KEY (`message_status_id`) REFERENCES `message_status` (`message_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `message_subtype` FOREIGN KEY (`message_subtype_id`) REFERENCES `message_subtype` (`message_subtype_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `message_type` FOREIGN KEY (`message_type_id`) REFERENCES `message_type` (`message_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `receiver_details_user` FOREIGN KEY (`receiver_user_id`) REFERENCES `users` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sender_details_user` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
