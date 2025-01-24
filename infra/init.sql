UPDATE mysql.user SET host = '%' WHERE user = 'root';
FLUSH PRIVILEGES;