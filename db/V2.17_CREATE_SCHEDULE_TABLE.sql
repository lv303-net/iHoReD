IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'SCHEDULE') 
	DROP TABLE SCHEDULE

CREATE TABLE SCHEDULE(
	ID INT PRIMARY KEY IDENTITY(1,1),
	IDDOCTOR INT NOT NULL FOREIGN KEY REFERENCES DOCTORS(IDDOCTORS),
	IDPATIENT INT NOT NULL FOREIGN KEY REFERENCES USERS(IDUSERS),
	START_DATETIME DATETIME NOT NULL, 
	END_DATETIME DATETIME NOT NULL
);
