IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_WORKED_HOURS')
	DROP PROC GET_WORKED_HOURS
GO
CREATE PROCEDURE GET_WORKED_HOURS
	@DOCTOR_ID INT,
	@DATE DATETIME,
	@WORKED_HOURS DECIMAL (4,2) OUTPUT
AS
BEGIN
	SET @WORKED_HOURS = (SELECT COALESCE(SUM(VISIT_TIME)/60., 0) FROM (SELECT (DATEDIFF(MINUTE, START_DATETIME, END_DATETIME)) AS VISIT_TIME FROM SCHEDULE 
	WHERE START_DATETIME = @DATE AND IDDOCTOR = @DOCTOR_ID) TOTAL_TIME)
END;