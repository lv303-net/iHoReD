IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_RULES')
DROP PROC GET_RULES;
GO
CREATE PROCEDURE GET_RULES 
AS
BEGIN
SELECT * FROM RULES;
END;
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'ADD_RULE')
DROP PROC ADD_RULE;
GO
CREATE PROCEDURE ADD_RULE
@NAME NVARCHAR(50), @HOUR_START TIME, @HOUR_END TIME, @PERIOD_START DATE, @PERIOD_END DATE, @INCLUSIVE BIT, 
@SUNDAY BIT, @MONDAY BIT, @TUESDAY BIT, @WEDNESDAY BIT,
@THIRSDAY BIT, @FRIDAY BIT,@SATURDAY BIT
AS
BEGIN
INSERT INTO RULES VALUES (@NAME, @HOUR_START, @HOUR_END, @PERIOD_START, @PERIOD_END, @INCLUSIVE, @SUNDAY, @MONDAY, @TUESDAY, @WEDNESDAY, @THIRSDAY, @FRIDAY, @SATURDAY);
END;
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'UPDATE_RULE')
DROP PROC UPDATE_RULE;
GO
CREATE PROCEDURE UPDATE_RULE
@ID INT,@NAME NVARCHAR(50), @HOUR_START TIME, @HOUR_END TIME, @PERIOD_START DATE, @PERIOD_END DATE, @INCLUSIVE BIT, 
@SUNDAY BIT, @MONDAY BIT, @TUESDAY BIT, @WEDNESDAY BIT,
@THIRSDAY BIT, @FRIDAY BIT,@SATURDAY BIT
AS
BEGIN
IF ((SELECT COUNT(*) FROM RULES WHERE ID = @ID) = 1)
BEGIN
UPDATE RULES SET NAME=@NAME, HOUR_START=@HOUR_START, HOUR_END=@HOUR_END, PERIOD_START=@PERIOD_START,
PERIOD_END=@PERIOD_END, INCLUSIVE=@INCLUSIVE, SUNDAY=@SUNDAY, MONDAY=@MONDAY, TUESDAY=@TUESDAY, WEDNESDAY=@WEDNESDAY, THIRSDAY=@THIRSDAY, FRIDAY=@FRIDAY, SATURDAY=@SATURDAY
WHERE ID = @ID;
SELECT 1;
END;
ELSE
SELECT 0;
END;
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'DELETE_RULE')
DROP PROC GET_RULES;
GO
CREATE PROCEDURE DELETE_RULE 
@ID INT
AS
BEGIN
IF ((SELECT COUNT(*) FROM RULES WHERE ID=@ID) = 1)
BEGIN
DELETE FROM RULES WHERE ID = @ID;
SELECT 1;
END;
ELSE
SELECT 0;
END;