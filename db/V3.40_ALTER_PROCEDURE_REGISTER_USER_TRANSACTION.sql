IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'REGISTER_USER')
DROP PROC REGISTER_USER

GO
CREATE PROCEDURE REGISTER_USER
    @FIRSTNAME NVARCHAR(30), @LASTNAME NVARCHAR(30), @EMAIL NVARCHAR(40), @PASSWORD NVARCHAR(70), @PHONE NVARCHAR(13)
AS
BEGIN
    IF ((SELECT COUNT(*) FROM USERS WHERE EMAIL = @EMAIL) > 0) RETURN 0;
    ELSE 
    BEGIN 
	BEGIN TRANSACTION;
	INSERT INTO USERS (FIRSTNAME, LASTNAME, IDROLE, PASSWORD, EMAIL, IS_ACTIVATED) VALUES(@FIRSTNAME, @LASTNAME, 3, @PASSWORD, @EMAIL, 0);
	INSERT INTO USER_INFO (ID, PHONE) VALUES ((SELECT MAX(IDUsers) FROM USERS), @PHONE);
	RETURN 1;
	COMMIT TRANSACTION;
    END
END;