SET FOREIGN_KEY_CHECKS = 0;

SELECT CONCAT('DELETE FROM ', table_name, ';') AS delete_statement
FROM information_schema.tables
WHERE table_schema = 'csc_4710_project_02';

SET FOREIGN_KEY_CHECKS = 1;