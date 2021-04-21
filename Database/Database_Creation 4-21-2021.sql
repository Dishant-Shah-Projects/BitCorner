CREATE SCHEMA `BitCorner` ;
use `BitCorner`;

CREATE TABLE `USER_INFO` (
  `USER_ID` varchar(100)  primary key,
  `USERNAME`  varchar(60)  unique,
 `NICKNAME` varchar(60) unique
);
CREATE TABLE `CURRENCY` (
  `ID` int  auto_increment primary key,
  `NAME`  varchar(60)  unique not null,
  `CONVERSIONRATE` float not null
);

CREATE TABLE `USER_BANK_INFO`(
`USER_ID` varchar(100)  primary key,
`BANK_NAME` varchar(100) not null,
`COUNTRY` varchar(100) not null,
`ACCOUNT_NUMBER` varchar(100) not null,
`OWNER_NAME` varchar(100) not null,
  `STREET` varchar(100) not null,
  `CITY` varchar(50) not null,
  `STATE` varchar(50) not null,
  `ZIP`  varchar(50) not null,
  `PRIMARY_CURRENCY` int not null,
  foreign key (USER_ID) references USER_INFO(USER_ID),
  foreign key (PRIMARY_CURRENCY) references CURRENCY(ID)
);
CREATE TABLE `USER_BALANCE` (
  `USER_ID` varchar(100)  primary key,
  `BALANCE_BITCOIN`  bigint  not null,
  `BALANCE_USD` bigint not null,
  foreign key (USER_ID) references USER_INFO(USER_ID)
);

CREATE TABLE `ORDER`(
`ID` bigint  auto_increment primary key,
`USER_ID` varchar(100) not null,
`TYPE` enum('BUY','SELL') not null,
`PRICE_TYPE` enum('MARKET','LIMIT') not null,
`QUANTITY` float not null,
`RATE` float,
foreign key (USER_ID) references USER_INFO(USER_ID)
);
 CREATE TABLE `MESSAGE`(
	`ID` int primary key auto_increment,
    `FROM_USER` varchar(100),
    `TO_USER` varchar(100),
    `MESSAGE` varchar (1000),
    `TIME` time,
    foreign key (FROM_USER) references USER_INFO(USER_ID),
    foreign key (TO_USER) references USER_INFO(USER_ID)
 );
