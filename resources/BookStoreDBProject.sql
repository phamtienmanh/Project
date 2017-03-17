USE master
GO
IF db_id (N'BookStoreDBProject') is not null
	Drop database [BookStoreDBProject];
GO
Create database [BookStoreDBProject]
GO
USE [BookStoreDBProject]
GO

CREATE TABLE customer(
	_id [nvarchar](100) PRIMARY KEY,
	name [nvarchar](100) NOT NULL,
	email [nvarchar](100) NOT NULL UNIQUE,
	password [nvarchar](100) NOT NULL,
	role [nvarchar](100) DEFAULT 'user',
	phone [nvarchar](100) NULL,
	address [nvarchar](500) NULL
	)
GO
	insert into customer values ('1','admin','admin@admin.com','admin','admin','111111111','HCM'),
								('2','user','user@user.com','user','user','222222222','HN')
GO
CREATE TABLE category(
	_id [nvarchar](100) PRIMARY KEY,
	name [nvarchar](500) NOT NULL
	)
GO
	insert into category values ('1','Novel'),
								('2','Comic'),
								('3','18+')
GO
CREATE TABLE product(
	_id [nvarchar](100) PRIMARY KEY,
	name [nvarchar](500) NOT NULL,
	category_id [nvarchar](100) FOREIGN KEY REFERENCES Category(_id),
	author [nvarchar](50) DEFAULT 'Unknow',
	price float NOT NULL,
	image [nvarchar](500) DEFAULT 'default.jpeg',
	discription [nvarchar](500) NULL,
	quantity [int] NOT NULL
	)
GO
	insert into product values ('1','Harry potter','1','J.K Rowling',120,'default.jpeg',null,100),
								('2','Badman','2','Marvel',50,'default.jpeg',null,100),
								('3','Harry potter 2','1','J.K Rowling',130,'default.jpeg',null,100),
								('4','Badman 2','2','Marvel',60,'default.jpeg',null,100)
GO
CREATE TABLE productOrder(
	_id [nvarchar](100) PRIMARY KEY,
	customer_id [nvarchar](100) FOREIGN KEY REFERENCES customer(_id),
	date [date] DEFAULT getdate(),
	status [int] NULL
	)
GO
	insert into productOrder(_id,customer_id) values ('1','2'),
								('2','2'),
								('3','2')
GO
CREATE TABLE orderDetail(
	_id [nvarchar](100) PRIMARY KEY,
	productOrder_id [nvarchar](100) FOREIGN KEY REFERENCES productOrder(_id),
	product_id [nvarchar](100) FOREIGN KEY REFERENCES product(_id),
	quantity [int] NOT NULL
	)
GO
	insert into orderDetail values ('1','1','1',1),
									('2','1','2',2),
									('3','2','2',1),
									('4','3','4',3)
GO
CREATE TABLE wishlist(
	_id [nvarchar](100) PRIMARY KEY,
	customer_id [nvarchar](100) FOREIGN KEY REFERENCES customer(_id),
	product_id [nvarchar](100) FOREIGN KEY REFERENCES product(_id)
	)
GO
	insert into wishlist values ('1','1','1'),
								('2','1','2'),
								('3','2','4')
GO
CREATE TABLE rating(
	_id [nvarchar](100) PRIMARY KEY,
	customer_id [nvarchar](100) FOREIGN KEY REFERENCES customer(_id),
	product_id [nvarchar](100) FOREIGN KEY REFERENCES product(_id),
	star [int] NOT NULL 
	)
GO
	insert into rating values ('1','1','1',4),
								('2','1','2',5),
								('3','2','3',3),
								('4','2','4',4)
GO        