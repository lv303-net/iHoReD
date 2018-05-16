IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'EDIT_SOME_RATE')
	DROP PROC EDIT_SOME_RATE;

GO
CREATE PROCEDURE EDIT_SOME_RATE
	@PROFFESION_ID INT,
	@RATE DECIMAL (19,2),
	@START_DATE DATETIME
AS
BEGIN TRY
	IF ((SELECT COUNT(*) FROM SALARY_RATES WHERE PROFFESION_ID = @PROFFESION_ID AND PERIOD_START=@START_DATE) = 1)
		BEGIN
		DECLARE @ACTIVE_DATE DATETIME;
		SET @ACTIVE_DATE = (SELECT TOP 1 PERIOD_START FROM SALARY_RATES WHERE PROFFESION_ID = @PROFFESION_ID AND PERIOD_START <= GETDATE() ORDER BY PERIOD_START DESC);
		PRINT @ACTIVE_DATE;
		IF (@START_DATE = @ACTIVE_DATE)
			BEGIN
			SET @ACTIVE_DATE = DATEADD(day, 1, GETDATE());
			INSERT INTO SALARY_RATES VALUES (@PROFFESION_ID, @RATE, @ACTIVE_DATE);
			RETURN 1;
			END;
		ELSE IF (@START_DATE > @ACTIVE_DATE)
			BEGIN
			UPDATE SALARY_RATES SET RATE=@RATE 
			WHERE PROFFESION_ID = @PROFFESION_ID AND PERIOD_START = @START_DATE;
			RETURN 1;
			END;
		ELSE 
			BEGIN
			RETURN 0;
			END;
		END;
	ELSE
		RETURN 0;
END TRY
BEGIN CATCH
	RETURN 0;
END CATCH