ALTER TABLE ALLERGIES ALTER COLUMN ALLERGY_NAME NVARCHAR(50) NOT NULL;
ALTER TABLE USERS_ALLERGIES ALTER COLUMN USER_ID INT NOT NULL;
ALTER TABLE USERS_ALLERGIES ALTER COLUMN ALLERGY_ID INT NOT NULL;