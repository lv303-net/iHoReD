CREATE TABLE USERS_ALLERGIES(
ID INT PRIMARY KEY,
USER_ID INT FOREIGN KEY REFERENCES USERS(IDUsers),
ALLERGY_ID INT FOREIGN KEY REFERENCES ALLERGIES(ID_ALLERGY)
);