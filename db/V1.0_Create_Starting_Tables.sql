CREATE TABLE ROLES(IDRoles INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	ROLENAME NVARCHAR(15));

CREATE TABLE USERS (IDUsers INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	FIRSTNAME NVARCHAR(30) NOT NULL, 
	LASTNAME NVARCHAR(30) NOT NULL,
	IDROLE INT FOREIGN KEY REFERENCES ROLES(IDRoles),
	--ROLE NVARCHAR(15) NOT NULL, -- OR ROLE INT 1 - ADMIN, 2 - DOCTOR, 3 - PATIENT
	LOGIN NVARCHAR(15) NOT NULL,
	PASSWORD NVARCHAR(30) NOT NULL,
	EMAIL NVARCHAR(40) NOT NULL);
	
CREATE TABLE PROFESSIONS(IDProfessins INT PRIMARY KEY NOT NULL IDENTITY(1,1), 
	PROFESSINNAME NVARCHAR(30) UNIQUE,
	ISSTATIC BIT);

CREATE TABLE DOCTORS (IDDoctors INT PRIMARY KEY NOT NULL FOREIGN KEY REFERENCES USERS(IDUsers),
	IDPROFESSION INT FOREIGN KEY REFERENCES PROFESSIONS(IDProfessins),
	HOURSTART TIME(0),
	HOURFINISH TIME(0),
	DATEOFEMPLOYING DATE,
	IMAGEDOC NVARCHAR(100));
