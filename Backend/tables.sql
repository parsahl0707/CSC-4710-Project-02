CREATE TABLE Users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(255) UNIQUE,
	password VARCHAR(64),
	street VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(2),
	zipCode VARCHAR(5),
	country VARCHAR(2),
	cardNumber VARCHAR(16),
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	phoneNumber VARCHAR(12),
	email VARCHAR(255),
	registerTime DATETIME,
	loginTime DATETIME,
	admin BIT
);

CREATE TABLE QuoteRequests (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	quoteResponseId INT,
	quoteRequestRevisionId INT,
	street VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(2),
	zipCode VARCHAR(5),
	country VARCHAR(2),
	drivewaySize INT,
	proposedPrice FLOAT,
	imageUrl1 VARCHAR(255),
	imageUrl2 VARCHAR(255),
	imageUrl3 VARCHAR(255),
	imageUrl4 VARCHAR(255),
	imageUrl5 VARCHAR(255),
	note TEXT,
	status ENUM('pending', 'negotiating', 'rejected', 'accepted'),
	createdAt DATETIME
);

CREATE TABLE QuoteResponses (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	quoteRequestId INT,
	quoteResponseRevisionId INT,
	rejected BIT,
	proposedPrice FLOAT,
	startDate DATETIME,
	endDate DATETIME,
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE QuoteRequestRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	quoteRequestId INT,
	accepted BIT,
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE QuoteResponseRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	quoteResponseId INT,
	rejected BIT,
	proposedPrice FLOAT,
	startDate DATETIME,
	endDate DATETIME,
	note TEXT,
	createdAt DATETIME
);

ALTER TABLE QuoteRequests ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE QuoteRequests ADD FOREIGN KEY (quoteResponseId) REFERENCES QuoteResponses(id);
ALTER TABLE QuoteRequests ADD FOREIGN KEY (quoteRequestRevisionId) REFERENCES QuoteRequestRevisions(id);

ALTER TABLE QuoteResponses ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE QuoteResponses ADD FOREIGN KEY (quoteRequestId) REFERENCES QuoteRequests(id);
ALTER TABLE QuoteResponses ADD FOREIGN KEY (quoteResponseRevisionId) REFERENCES QuoteResponseRevisions(id);

ALTER TABLE QuoteRequestRevisions ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE QuoteRequestRevisions ADD FOREIGN KEY (quoteRequestId) REFERENCES QuoteRequests(id);

ALTER TABLE QuoteResponseRevisions ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE QuoteResponseRevisions ADD FOREIGN KEY (quoteResponseId) REFERENCES QuoteResponses(id);

CREATE TABLE WorkOrders (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	quoteRequestId INT,
	price FLOAT,
	startDate DATETIME,
	endDate DATETIME,
	status ENUM('pending', 'canceled', 'completed'),
	createdAt DATETIME
);

ALTER TABLE WorkOrders ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE WorkOrders ADD FOREIGN KEY (quoteRequestId) REFERENCES QuoteRequests(id);

CREATE TABLE BillRequests (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	workOrderId INT,
    billResponseId INT,
	billRequestRevisionId INT,
	price FLOAT,
	status ENUM('pending', 'disputed', 'paid'),
	paidAt DATETIME,
	createdAt DATETIME
);

CREATE TABLE BillResponses (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	billRequestId INT,
	billResponseRevisionId INT,
	disputed BIT,
	cardNumber VARCHAR(16),
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE BillRequestRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	billRequestId INT,
	price FLOAT,
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE BillResponseRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,
	billResponseId INT,
	disputed BIT,
	cardNumber VARCHAR(16),
	note TEXT,
	createdAt DATETIME
);

ALTER TABLE BillRequests ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE BillRequests ADD FOREIGN KEY (workOrderId) REFERENCES WorkOrders(id);
ALTER TABLE BillRequests ADD FOREIGN KEY (billResponseId) REFERENCES BillResponses(id);
ALTER TABLE BillRequests ADD FOREIGN KEY (billRequestRevisionId) REFERENCES BillRequestRevisions(id);

ALTER TABLE BillResponses ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE BillResponses ADD FOREIGN KEY (billRequestId) REFERENCES BillRequests(id);
ALTER TABLE BillResponses ADD FOREIGN KEY (billResponseRevisionId) REFERENCES BillResponseRevisions(id);

ALTER TABLE BillRequestRevisions ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE BillRequestRevisions ADD FOREIGN KEY (billRequestId) REFERENCES BillRequests(id);

ALTER TABLE BillResponseRevisions ADD FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE BillResponseRevisions ADD FOREIGN KEY (billResponseId) REFERENCES BillResponses(id);