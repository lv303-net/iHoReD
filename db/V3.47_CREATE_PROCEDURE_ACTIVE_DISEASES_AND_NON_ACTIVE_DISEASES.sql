IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='NON_ACTIVE_DISEASES')
BEGIN
	DROP PROC NON_ACTIVE_DISEASES
END
GO
CREATE PROCEDURE NON_ACTIVE_DISEASES
@ID_USER int
AS
BEGIN
      SELECT DISTINCT SUBDISEASES.SUBDISEASEID, SUBDISEASES.SUBDISEASENAME
      FROM SUBDISEASES 
      LEFT JOIN PATIENT_DISEASES
      ON SUBDISEASES.SUBDISEASEID=PATIENT_DISEASES.ID_DISEASE
      WHERE ID_DISEASE NOT IN(SELECT ID_DISEASE FROM PATIENT_DISEASES INNER JOIN SCHEDULE ON SCHEDULE.ID=ID_VISIT WHERE IDPATIENT=@ID_USER)
      OR (ID_DISEASE IS NULL OR PATIENT_DISEASES.END_DATETIME<=GETDATE());
END;
GO


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='ACTIVE_DISEASES')
BEGIN
	DROP PROC ACTIVE_DISEASES
END
GO
CREATE PROCEDURE ACTIVE_DISEASES
@ID_USER int
AS
BEGIN
      SELECT SUBDISEASEID,SUBDISEASENAME FROM(SELECT * FROM SUBDISEASES
      LEFT JOIN PATIENT_DISEASES
      ON SUBDISEASES.SUBDISEASEID=PATIENT_DISEASES.ID_DISEASE)AS ALL_DISEASES 
      INNER JOIN SCHEDULE 
      ON ALL_DISEASES.ID_VISIT=SCHEDULE.ID
      WHERE SCHEDULE.IDPATIENT=@ID_USER AND (ALL_DISEASES.END_DATETIME IS NULL)
END