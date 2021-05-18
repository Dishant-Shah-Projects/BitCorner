DROP SCHEMA IF EXISTS BitCorner;

CREATE SCHEMA `BitCorner` ;
use `BitCorner`;

CREATE TABLE `USER_INFO` (
  `USER_ID` varchar(100)  primary key,
  `USERNAME`  varchar(100)  unique not null,
  `NICKNAME` varchar(50) unique not null
);

CREATE TABLE `CURRENCY` (
  `ID` bigint  auto_increment primary key,
  `NAME`  varchar(50)  unique not null,
  `CONVERSION_RATE` float not null,
  `IS_CRYPTO` bit not null default 0,
  `IS_BASE` bit not null default 0,
  `INITIAL_VALUE` float not null  default 100
);

CREATE TABLE `USER_BANK_INFO`(
`USER_ID` varchar(100)  primary key,
`BANK_NAME` varchar(50) not null,
`COUNTRY` varchar(50) not null,
`ACCOUNT_NUMBER` bigint not null,
`OWNER_NAME` varchar(50) not null,
`STREET` varchar(100) not null,
`CITY` varchar(50) not null,
`STATE` varchar(50) not null,
`ZIP`  varchar(50) not null,
`PRIMARY_CURRENCY_ID` bigint not null,
foreign key (USER_ID) references USER_INFO(USER_ID),
foreign key (PRIMARY_CURRENCY_ID) references CURRENCY(ID)
);

CREATE TABLE `USER_BALANCE` (
  `USER_ID` varchar(100) not null,
  `CURRENCY_ID` bigint not null,
  `AMOUNT`  float  not null,
  foreign key (USER_ID) references USER_INFO(USER_ID),
  foreign key (CURRENCY_ID) references CURRENCY(ID),
  primary key (USER_ID,CURRENCY_ID)
);
CREATE TABLE `ORDER_TABLE`(
`ID` bigint  auto_increment primary key,
`USER_ID` varchar(100) not null,
`TYPE` enum('BUY','SELL') not null,
`PRICE_TYPE` enum('MARKET','LIMIT') not null,
`QUANTITY` float not null,
`LIMIT_PRICE` float,
`EXECUTION_PRICE` float default 0,
`STATUS` enum('Open','Fulfilled','Cancelled') not null default 'Open',
`CURRENCY_ID` bigint not null,
`SERVICE_FEE` float default 0,
`TIME` datetime not null,
foreign key (USER_ID) references USER_INFO(USER_ID),
foreign key (CURRENCY_ID) references CURRENCY(ID)
);

 CREATE TABLE `MESSAGE`(
	`ID` bigint primary key auto_increment,
	`FROM_USER` varchar(100) not null,
	`TO_USER` varchar(100) not null,
	`MESSAGE` varchar (1000) not null,
	foreign key (FROM_USER) references USER_INFO(USER_ID),
	foreign key (TO_USER) references USER_INFO(USER_ID)
 );
 
 
 CREATE TABLE `BILL`(
   `ID` bigint primary key auto_increment,
   `FROM_USER` varchar(100) not null,
   `TO_USER` varchar(100) not null,
   `DESCRIPTION` varchar(100) not null,
   `TARGET_CURRENCY` bigint not null,
   `AMOUNT` float  not null,
   `DUE_DATE` date not null,
   `STATUS` enum('Waiting','Rejected','Paid','Overdue','Cancelled') not null default 'Waiting',
   `PAID_CURRENCY` bigint, 
   `SERVICE_FEE` float not null default 0,
   foreign key (FROM_USER) references USER_INFO(USER_ID),
	 foreign key (TO_USER) references USER_INFO(USER_ID),
   foreign key (TARGET_CURRENCY) references CURRENCY(ID),
   foreign key (PAID_CURRENCY) references CURRENCY(ID)
 );
 
 CREATE TABLE `MARKET_PRICE` (
   `ID` bigint primary key auto_increment,
   `BID_PRICE` float not null,
   `ASK_PRICE` float not null
 );
-- DROP EVENT  `DateChange`;
CREATE EVENT `DateChange` ON SCHEDULE
        EVERY 3 HOUR
--     ENABLE
--     COMMENT ''
    DO 
UPDATE BILL SET BILL.STATUS ='Overdue' WHERE BILL.DUE_DATE<curdate() AND BILL.STATUS='Waiting';
