-- sudo mysql   # or: mysql -u'root' -p

CREATE DATABASE db_name;

-- SHOW DATABASES;
-- SHOW SCHEMAS;

-- https://mariadb.com/kb/en/authentication-plugin-mysql_native_password/
CREATE USER 'db_admin'@'localhost'
  IDENTIFIED BY 'strong-password';

GRANT USAGE ON *.* TO 'db_admin'@'localhost';

ALTER USER 'db_admin'@'localhost'
    REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 
    MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

GRANT ALL PRIVILEGES ON `db_name`.* 
    TO 'db_admin'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;
