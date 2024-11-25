CREATE TABLE Users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(255) UNIQUE,
	password VARCHAR(64),
	street VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(2),
	zip_code VARCHAR(5),
	country VARCHAR(2),
	credit_card_number VARCHAR(16),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	phone_number VARCHAR(12),
	email_address VARCHAR(255),
	register_time DATETIME,
	login_time DATETIME,
	admin BIT
);

CREATE TABLE QuoteRequests (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT FOREIGN KEY REFERENCES Users(id),
	quote_response_id INT FOREIGN KEY REFERENCES QuoteResponses(id),
	street VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(2),
	zip_code VARCHAR(5),
	country VARCHAR(2),
	driveway_size INT,
	proposed_price FLOAT,
	image_url_1 VARCHAR(255),
	image_url_2 VARCHAR(255),
	image_url_3 VARCHAR(255),
	image_url_4 VARCHAR(255),
	image_url_5 VARCHAR(255),
	note TEXT,
	status ENUM('pending', 'negotiating', 'rejected', 'accepted'),
	created_at DATETIME
);

CREATE TABLE QuoteResponses (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT FOREIGN KEY REFERENCES Users(id),
	quote_request_id INT FOREIGN KEY REFERENCES QuoteRequests(id),
	rejected BIT,
	proposed_price FLOAT,
	start_date DATETIME,
	end_date DATETIME,
	note TEXT,
	created_at DATETIME
);

CREATE TABLE QuoteRequestRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	quote_request_id INT FOREIGN KEY REFERENCES QuoteRequests(id),
	accepted BIT,
	note TEXT,
	created_at DATETIME
);

CREATE TABLE QuoteResponseRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	quote_response_id INT FOREIGN KEY REFERENCES QuoteResponses(id),
	rejected BIT,
	proposed_price FLOAT,
	start_date DATETIME,
	end_date DATETIME,
	note TEXT,
	created_at DATETIME
);

CREATE TABLE WorkOrders (
	id INT PRIMARY KEY AUTO_INCREMENT,
	quote_request_id INT FOREIGN KEY REFERENCES QuoteRequests(id),
	price FLOAT,
	start_date DATETIME,
	end_date DATETIME,
	status ENUM('pending', 'canceled', 'completed'),
	created_at DATETIME
);

CREATE TABLE BillRequests (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT FOREIGN KEY REFERENCES USERS(id),
	work_order_id INT FOREIGN KEY REFERENCES WorkOrders(id),
    bill_response_id INT FOREIGN KEY REFERENCES BillResponses(id),
	price FLOAT,
	status ENUM('pending', 'disputed', 'paid'),
	created_at DATETIME
);

CREATE TABLE BillResponses (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT FOREIGN KEY REFERENCES USERS(id),
	bill_request_id INT FOREIGN KEY REFERENCES BillRequests(id),
	disputed BIT,
	credit_card_number VARCHAR(16),
	note TEXT,
	created_at DATETIME
);

CREATE TABLE BillRequestRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	bill_request_id INT FOREIGN KEY REFERENCES BillRequests(id),
	price FLOAT,
	note TEXT,
	created_at DATETIME
);

CREATE TABLE BillResponseRevisions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	bill_response_id INT FOREIGN KEY REFERENCES BillResponse(id),
	disputed BIT,
	credit_card_number VARCHAR(16),
	note TEXT,
	created_at DATETIME
);
