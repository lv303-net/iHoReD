--PROCEDURES

--GET ALL INFORMATION ABOUT DOCTORS FROM TABLES DOCTORS, PROFESSIONS, USERS
GO
CREATE PROCEDURE GETINFOABOUTDOCTORS AS
	(SELECT IDDoctors, FIRSTNAME, LASTNAME, PROFESSINNAME, HOURSTART,HOURFINISH ,DATEOFEMPLOYING,IMAGEDOC 
		FROM  (DOCTORS INNER JOIN PROFESSIONS ON IDProfessins=IDPROFESSION) INNER JOIN USERS
			ON IDDoctors=IDUSERS);

--GET TABLE DOCTORS
GO
CREATE PROCEDURE GETTABLEDOCTORS AS
	(SELECT * FROM DOCTORS);

--GET FIRSTNAME BY IDDOCTOR
GO
CREATE PROCEDURE GETFIRSTNAME
    @IDDOC INT
AS
SELECT  FIRSTNAME FROM USERS
	WHERE IDUsers=@IDDOC;

--GET LASTNAME BY IDDOCTOR
GO
CREATE PROCEDURE GETLASTNAME
    @IDDOC INT
AS
SELECT  LASTNAME FROM USERS
	WHERE IDUsers=@IDDOC;

--GET PROFESSION BY IDDOCTOR
GO
CREATE PROCEDURE GETPROFESSION
    @IDDOC INT
AS
SELECT  PROFESSINNAME FROM PROFESSIONS
	WHERE IDProfessins=(
		SELECT IDPROFESSION FROM DOCTORS WHERE IDDoctors=@IDDOC);

--Get users firstname, lastname with some profession
Go
create procedure Get_Doctors_With_Some_Profession
	@Profession_Name nvarchar (30)
as
	select FIRSTNAME, LASTNAME
	from USERS
	inner join DOCTORS on  USERS.IDUsers = DOCTORS.IDDoctors
	where DOCTORS.IDPROFESSION = 
	(
		select IDProfessins
		from PROFESSIONS
		where PROFESSINNAME = @Profession_Name
	);

--Get professions, which is or isn`t static
Go
Create Procedure Get_List_Professions
	@Is_Static BIT
as
	Select PROFESSINNAME 
	From PROFESSIONS
	Where ISSTATIC = @Is_Static;
