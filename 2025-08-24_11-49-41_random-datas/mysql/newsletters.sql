-- Dados de newsletters
CREATE TABLE IF NOT EXISTS newsletters (
id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), ip VARCHAR(45), registered_in DATETIME
);

INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('1', 'Ana Mosciski', 'Tevin.Halvorson@gmail.com', 'e604:eacb:cbff:474d:ded9:e9be:2079:ce5c', '2025-07-06 08:52:23');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('2', 'Jared Dibbert', 'Amani.Vandervort@hotmail.com', 'beb9:ea4b:94cf:7ff4:4ac5:d12d:8e48:ab0f', '2025-08-05 20:32:32');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('3', 'Kayla Hyatt-Schmitt', 'Noe77@hotmail.com', 'afbd:e8a2:c0bc:7b2b:58d8:205f:fe3f:ccaf', '2025-06-16 22:42:15');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('4', 'Steve Kub', 'Zachary98@hotmail.com', 'fe82:dba9:9ab4:716f:fc67:6c27:ed8c:a7b1', '2025-08-08 06:07:11');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('5', 'Maxine Grimes', 'Matilde_Haag34@gmail.com', '69a0:7d9a:e39f:f447:2f35:eabd:1fab:b89f', '2025-06-04 10:41:44');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('6', 'Marian Connelly PhD', 'Willy58@hotmail.com', '242.3.143.78', '2025-07-13 12:38:36');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('7', 'Ernesto West', 'Kaylin_Auer@yahoo.com', 'aca7:f62a:bbda:6cc8:9dd9:96db:ae0b:ed6b', '2025-06-03 02:31:15');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('8', 'Chelsea Runte', 'Joana62@yahoo.com', '114.43.219.242', '2025-07-10 09:04:22');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('9', 'Sadie Powlowski', 'Helena34@gmail.com', '115.233.208.85', '2025-07-06 21:02:34');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('10', 'Alicia Schroeder', 'Emiliano_Langworth@gmail.com', '17.161.233.155', '2025-05-19 16:29:39');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('11', 'Darren Johnson', 'Hazle3@yahoo.com', '153.165.241.66', '2025-06-19 15:16:17');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('12', 'Clay Reichel', 'Sarina.Connelly-Rutherford@yahoo.com', '130.135.39.49', '2025-06-04 07:17:46');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('13', 'Mrs. Doris Christiansen Sr.', 'Megane_Reichel@gmail.com', '6027:ff8f:8f72:ed09:4c45:3bc7:a991:0e7f', '2025-07-27 08:30:38');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('14', 'Darin Sporer', 'Brandt_Sauer68@hotmail.com', '60.88.131.173', '2025-08-24 03:26:01');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('15', 'Sam Balistreri', 'Golda_McLaughlin@yahoo.com', 'b5ad:8de3:02b3:0bb8:f732:3b74:adaa:fc4b', '2025-07-30 03:59:42');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('16', 'Ruby Hickle', 'Freeda73@hotmail.com', '230.100.126.144', '2025-08-06 11:36:03');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('17', 'Kerry Hoppe', 'Jessica_Wintheiser23@hotmail.com', 'fbda:f031:cca6:cd8c:b0de:7b10:eab3:9d8b', '2025-07-17 09:22:53');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('18', 'Dr. Merle Nitzsche', 'Hilario23@gmail.com', '914b:194e:b91e:dd7c:0ebd:171b:b4c3:d013', '2025-07-28 17:28:23');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('19', 'Kari Kreiger', 'Nicklaus73@yahoo.com', 'd49c:0c16:c466:e2c2:c959:cca6:fbae:aab1', '2025-06-27 14:46:04');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('20', 'Julian Mosciski', 'Regan_Kihn5@gmail.com', 'c6d9:eda2:bb8f:abef:e29e:d39c:56a5:5fb2', '2025-06-20 14:51:24');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('21', 'Dr. Emilio Collier DVM', 'Jeffrey72@gmail.com', 'f16b:a6a3:b0f8:c45c:30c4:6772:aa7c:8b36', '2025-08-18 19:09:21');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('22', 'Salvador Ward', 'Henderson_Kautzer@gmail.com', '87.81.107.110', '2025-07-09 01:11:44');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('23', 'Charlene Streich', 'Jennifer.Murazik@yahoo.com', '74.149.116.197', '2025-05-26 23:19:12');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('24', 'Brandon Effertz', 'Luz31@hotmail.com', '199.247.170.174', '2025-07-20 21:24:39');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('25', 'Adrian Farrell', 'Celia_Kohler@hotmail.com', '42.19.123.252', '2025-08-07 23:25:23');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('26', 'Dr. Rick Wiegand', 'Susan46@yahoo.com', 'edfd:6dcd:abc4:fe65:f193:c841:37ff:3ebe', '2025-08-03 18:16:42');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('27', 'Dr. Katie Hane', 'Alexandrine_Hansen@gmail.com', '202.237.152.4', '2025-06-27 06:54:31');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('28', 'Beverly Daniel', 'Danny67@yahoo.com', 'f942:dbca:bb8b:7c2e:de9b:0b56:3d55:8bf8', '2025-08-19 20:13:59');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('29', 'Ethel Blanda-Ruecker', 'Miracle95@gmail.com', '93.195.24.119', '2025-07-06 19:02:53');
INSERT INTO newsletters (id, name, email, ip, registered_in) VALUES ('30', 'Dianna Kuhn', 'Vivianne23@gmail.com', '161.201.169.17', '2025-08-20 23:56:04');
