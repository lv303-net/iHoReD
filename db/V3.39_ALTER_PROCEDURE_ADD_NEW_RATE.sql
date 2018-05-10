IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'ADD_NEW_RATE')
	DROP PROC ADD_NEW_RATE;

GO
CREATE PROCEDURE ADD_NEW_RATE
	@ID INT,
	@RATE DECIMAL (19,2),
	@START_DATE DATETIME
AS
BEGIN TRY
	INSERT INTO SALARY_RATES VALUES (@ID, @RATE, @START_DATE);	
END TRY
BEGIN CATCH
	SELECT @@ROWCOUNT
END CATCH
