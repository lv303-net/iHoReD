ALTER TABLE USERS_ALLERGIES
ADD PRIMARY KEY (USER_ID, ALLERGY_ID);

ALTER TABLE USERS_ALLERGIES
DROP CONSTRAINT COLUMN ID;

ALTER TABLE USERS_ALLERGIES DROP CONSTRAINT PK_USERS_ALLERGIES;

ALTER TABLE USERS_ALLERGIES ADD CONSTRAINT PK_USERS_ALLERGIES PRIMARY KEY (USER_ID, ALLERGY_ID);

ALTER TABLE USERS_ALLERGIES
DROP COLUMN ID;
