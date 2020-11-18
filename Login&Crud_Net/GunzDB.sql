USE [master]
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = N'Gunz')
 DROP DATABASE Gunz
GO

CREATE DATABASE Gunz
GO

USE Gunz
GO

--CREATE TABLE [User] (
-- [UserID] int IDENTITY(1,1) PRIMARY KEY,
-- [Username] varchar(50),
-- [UserPassword] varchar(20)
--);

--INSERT INTO [dbo].[User] VALUES ('gunz1','password1')
--INSERT INTO [dbo].[User] VALUES ('gunz2','password2')
--INSERT INTO [dbo].[User] VALUES ('gunz3','password3')
--INSERT INTO [dbo].[User] VALUES ('gunz4','password4')
--INSERT INTO [dbo].[User] VALUES ('gunz5','password5')

CREATE TABLE [GunType] (
 [GunTypeID] int IDENTITY(1,1) PRIMARY KEY,
 [GunTypeName] varchar(20)
);

INSERT INTO [dbo].[GunType] VALUES ('Handgun')
INSERT INTO [dbo].[GunType] VALUES ('Assault Rifle')
INSERT INTO [dbo].[GunType] VALUES ('Light Machine Gun')
INSERT INTO [dbo].[GunType] VALUES ('Shotgun')
INSERT INTO [dbo].[GunType] VALUES ('Sniper')
INSERT INTO [dbo].[GunType] VALUES ('Submachine Gun')

CREATE TABLE [GunAutomatic] (
 [GunAutomaticID] int IDENTITY(1,1) PRIMARY KEY,
 [GunAutoDesc] varchar(20)
);

INSERT INTO [dbo].[GunAutomatic] VALUES ('Automatic')
INSERT INTO [dbo].[GunAutomatic] VALUES ('Semi-Automatic')
INSERT INTO [dbo].[GunAutomatic] VALUES ('3 Round Burst')

CREATE TABLE [Gun]  (
  [GunID] int IDENTITY(1,1) PRIMARY KEY not null,
  [GunName] varchar(50) not null,
  [GunDescription] varchar(50) not null,
  [GunTypeID] int FOREIGN KEY REFERENCES [GunType]([GunTypeID]),
  [GunAutomaticID] int FOREIGN KEY REFERENCES [GunAutomatic]([GunAutomaticID])
);

INSERT INTO [dbo].[Gun] VALUES ('Colt .45','Colt .45',1,2)
INSERT INTO [dbo].[Gun] VALUES ('Desert Eagle','Basically a Sniper',1,2)
INSERT INTO [dbo].[Gun] VALUES ('PDW','Automatic Pistol',1,1)
INSERT INTO [dbo].[Gun] VALUES ('AK-47','What the Talibans Use',2,1)
INSERT INTO [dbo].[Gun] VALUES ('Famas','Light AR',2,3)
INSERT INTO [dbo].[Gun] VALUES ('RPD','Bigger Version of the AK-47',3,1)
INSERT INTO [dbo].[Gun] VALUES ('Model 680','HECTIC',4,2)
INSERT INTO [dbo].[Gun] VALUES ('Drakon','Russian Sniper',5,2)
INSERT INTO [dbo].[Gun] VALUES ('Barrett .50','50 Caliber sniper',5,2)
INSERT INTO [dbo].[Gun] VALUES ('Skorpion','Like the creature, but a gun',6,1)

--CREATE TABLE [GunUser] (
-- [GunUserID] int IDENTITY(1,1) PRIMARY KEY,
-- [UserID] int FOREIGN KEY REFERENCES [User]([UserID]),
-- [GunID] int FOREIGN KEY REFERENCES [Gun]([GunID])
--);

--INSERT INTO [dbo].[GunUser] VALUES (1,1)
--INSERT INTO [dbo].[GunUser] VALUES (1,2)
--INSERT INTO [dbo].[GunUser] VALUES (1,3)
--INSERT INTO [dbo].[GunUser] VALUES (2,1)
--INSERT INTO [dbo].[GunUser] VALUES (2,3)
--INSERT INTO [dbo].[GunUser] VALUES (2,5)
--INSERT INTO [dbo].[GunUser] VALUES (3,2)
--INSERT INTO [dbo].[GunUser] VALUES (3,4)
--INSERT INTO [dbo].[GunUser] VALUES (3,6)
--INSERT INTO [dbo].[GunUser] VALUES (4,4)
--INSERT INTO [dbo].[GunUser] VALUES (4,5)
--INSERT INTO [dbo].[GunUser] VALUES (4,6)
