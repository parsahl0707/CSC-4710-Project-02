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
	userId INT FOREIGN KEY REFERENCES Users(id),
	quoteResponseId INT FOREIGN KEY REFERENCES QuoteResponses(id),
	quoteRequestRevisionId INT FOREIGN KEY REFERENCES QuoteRequestRevisions(id),
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
	userId INT FOREIGN KEY REFERENCES Users(id),
	quoteRequestId INT FOREIGN KEY REFERENCES QuoteRequests(id),
	quoteResponseRevisionId INT FOREIGN KEY REFERENCES QuoteResponseRevisions(id),
	rejected BIT,
	proposedPrice FLOAT,
	startDate DATETIME,
	endDate DATETIME,
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE QuoteRequestRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT FOREIGN KEY REFERENCES Users(id),
	quoteRequestId INT FOREIGN KEY REFERENCES QuoteRequests(id),
	accepted BIT,
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE QuoteResponseRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT FOREIGN KEY REFERENCES Users(id),
	quoteResponseId INT FOREIGN KEY REFERENCES QuoteResponses(id),
	rejected BIT,
	proposedPrice FLOAT,
	startDate DATETIME,
	endDate DATETIME,
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE WorkOrders (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT FOREIGN KEY REFERENCES Users(id),
	quoteRequestId INT FOREIGN KEY REFERENCES QuoteRequests(id),
	price FLOAT,
	startDate DATETIME,
	endDate DATETIME,
	status ENUM('pending', 'canceled', 'completed'),
	createdAt DATETIME
);

CREATE TABLE BillRequests (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT FOREIGN KEY REFERENCES USERS(id),
	workOrderId INT FOREIGN KEY REFERENCES WorkOrders(id),
    billResponseId INT FOREIGN KEY REFERENCES BillResponses(id),
	billRequestRevisionId INT FOREIGN KEY REFERENCES BillrequestRevisions(id),
	price FLOAT,
	status ENUM('pending', 'disputed', 'paid'),
	paidAt DATETIME,
	createdAt DATETIME
);

CREATE TABLE BillResponses (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT FOREIGN KEY REFERENCES USERS(id),
	billRequestId INT FOREIGN KEY REFERENCES BillRequests(id),
	billResponseRevisionId INT FOREIGN KEY REFERENCES BillResponseRevisions(id),
	disputed BIT,
	cardNumber VARCHAR(16),
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE BillRequestRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT FOREIGN KEY REFERENCES USERS(id),
	billRequestId INT FOREIGN KEY REFERENCES BillRequests(id),
	price FLOAT,
	note TEXT,
	createdAt DATETIME
);

CREATE TABLE BillResponseRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId INT FOREIGN KEY REFERENCES USERS(id),
	billResponseId INT FOREIGN KEY REFERENCES BillResponse(id),
	disputed BIT,
	cardNumber VARCHAR(16),
	note TEXT,
	createdAt DATETIME
);
