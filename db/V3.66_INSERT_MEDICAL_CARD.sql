BEGIN TRANSACTION
	INSERT INTO MEDICAL_CARD(ID_VISIT, DESCRIPTION, CURE)
	SELECT TOP 10 ID, 'Description: headache, high temperature etc', 'Treatment for the first two days: acetylsalicylic acid and etc.'
	FROM SCHEDULE WHERE IDPATIENT > 44 ORDER BY NEWID()
COMMIT TRANSACTION
