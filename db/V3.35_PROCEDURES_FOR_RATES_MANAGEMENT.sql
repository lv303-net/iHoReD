IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'DELETE_SOME_RATE')
	DROP PROC DELETE_SOME_RATE;

GO
CREATE PROCEDURE DELETE_SOME_RATE
	@ID INT,
	@START_DATE DATETIME
AS
BEGIN
	IF ((SELECT COUNT(*) FROM SALARY_RATES WHERE PROFFESION_ID = @ID AND PERIOD_START = @START_DATE) = 1)
		BEGIN	
		DELETE FROM SALARY_RATES WHERE PROFFESION_ID = @ID AND PERIOD_START = @START_DATE;
		SELECT 1;
		END;
	ELSE
		SELECT 0;
END;
-------------------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'ADD_NEW_RATE')
	DROP PROC ADD_NEW_RATE;

GO
CREATE PROCEDURE ADD_NEW_RATE
	@ID INT,
	@RATE DECIMAL (19,2),
	@START_DATE DATETIME
AS
BEGIN
	INSERT INTO SALARY_RATES VALUES (@ID, @RATE, @START_DATE);
END;
SELECT * FROM SALARY_RATES
-------------------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'EDIT_SOME_RATE')
	DROP PROC EDIT_SOME_RATE;

GO
CREATE PROCEDURE EDIT_SOME_RATE
	@ID INT,
	@RATE DECIMAL (19,2),
	@START_DATE DATETIME
AS
BEGIN
	IF ((SELECT COUNT(*) FROM SALARY_RATES WHERE PROFFESION_ID = @ID AND PERIOD_START=@START_DATE) = 1)
		BEGIN
		DECLARE @ACTIVE_DATE DATETIME;
		SET @ACTIVE_DATE = (SELECT TOP 1 PERIOD_START FROM SALARY_RATES WHERE PROFFESION_ID = @ID AND PERIOD_START <= GETDATE() ORDER BY PERIOD_START DESC);
		PRINT @ACTIVE_DATE;
		IF (@START_DATE = @ACTIVE_DATE)
			BEGIN
			SET @ACTIVE_DATE = DATEADD(day, 1, @ACTIVE_DATE);
			EXEC ADD_NEW_RATE @ID, @RATE, @ACTIVE_DATE;
			SELECT 1;
			END;
		ELSE 
			BEGIN
			UPDATE SALARY_RATES SET RATE=@RATE 
			WHERE PROFFESION_ID = @ID AND PERIOD_START=@START_DATE;
			SELECT 1;
			END;
		END;
	ELSE
		SELECT 0;
END;