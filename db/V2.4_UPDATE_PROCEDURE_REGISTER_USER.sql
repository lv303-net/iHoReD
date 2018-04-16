IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'REGISTER_USER')
DROP PROC REGISTER_USER

GO
CREATE PROCEDURE REGISTER_USER 
    @FIRSTNAME NVARCHAR(30), @LASTNAME NVARCHAR(30), @EMAIL NVARCHAR(40), @LOGIN NVARCHAR(40), @PASSWORD NVARCHAR(30)
AS
BEGIN
    IF ((SELECT COUNT(*) FROM USERS WHERE EMAIL = @EMAIL) > 0) RETURN 0;
    ELSE 
    BEGIN 
        INSERT INTO USERS (FIRSTNAME, LASTNAME, IDROLE, LOGIN, PASSWORD, EMAIL) VALUES(@FIRSTNAME, @LASTNAME, 3, @LOGIN, @PASSWORD, @EMAIL);
        RETURN 1;
    END
END;