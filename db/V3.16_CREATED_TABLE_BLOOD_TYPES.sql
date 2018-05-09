BEGIN TRANSACTION;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'BLOOD_TYPES') 
	BEGIN 
		DROP TABLE BLOOD_TYPES
	END


	BEGIN
		CREATE TABLE BLOOD_TYPES (
			ID INT IDENTITY(1,1) PRIMARY KEY,
			BLOOD_TYPE NVARCHAR(3)
		)
		END;
COMMIT;