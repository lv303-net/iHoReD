IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'EDIT_USER_INFO')
DROP PROC EDIT_USER_INFO;

GO
CREATE PROCEDURE EDIT_USER_INFO
@ID int, @PHONE NVARCHAR(13), @SEX BIT, @COUNTRY NVARCHAR(60), @CITY NVARCHAR(60), @STREET NVARCHAR(60), @APARTMENT NVARCHAR(10),
@FIRSTNAME NVARCHAR(30), @LASTNAME NVARCHAR(30), @EMAIL NVARCHAR(40)
AS
BEGIN
IF ((SELECT COUNT(*) FROM USERS WHERE IDUsers = @ID) = 0)
BEGIN
RETURN 0;
END;
IF ((SELECT COUNT(*) FROM USER_INFO WHERE ID = @ID) = 0)
BEGIN
INSERT INTO USER_INFO (ID, PHONE, SEX, COUNTRY, CITY, STREET, APARTMENT) VALUES (@ID, @PHONE, @SEX, @COUNTRY, @CITY, @STREET, @APARTMENT);
RETURN 2;
END;
BEGIN TRANSACTION;
UPDATE USERS SET
FIRSTNAME=@FIRSTNAME, LASTNAME=@LASTNAME, EMAIL=@EMAIL
WHERE IDUsers=@ID;
UPDATE USER_INFO SET
PHONE=@PHONE, SEX=@SEX, COUNTRY=@COUNTRY, CITY=@CITY, STREET=@STREET, APARTMENT=@APARTMENT
WHERE ID = @ID;
COMMIT TRANSACTION;
RETURN 1;
END;