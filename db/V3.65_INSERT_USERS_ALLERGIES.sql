BEGIN TRANSACTION
	INSERT INTO USERS_ALLERGIES (ALLERGY_ID, ID_VISIT)
	SELECT ID_ALLERGY, (SELECT TOP 1 ID FROM SCHEDULE WHERE IDPATIENT < 100 ORDER BY NEWID()) 
	FROM ALLERGIES WHERE ID_ALLERGY > 5

	INSERT INTO USERS_ALLERGIES (ALLERGY_ID, ID_VISIT)
	SELECT ID_ALLERGY, (SELECT TOP 1 ID FROM SCHEDULE WHERE IDPATIENT > 100 AND IDPATIENT < 125 ORDER BY NEWID()) 
	FROM ALLERGIES WHERE ID_ALLERGY > 5

	INSERT INTO USERS_ALLERGIES (ALLERGY_ID, ID_VISIT)
	SELECT ID_ALLERGY, (SELECT TOP 1 ID FROM SCHEDULE WHERE IDPATIENT > 130 ORDER BY NEWID()) 
	FROM ALLERGIES WHERE ID_ALLERGY > 5
COMMIT TRANSACTION
