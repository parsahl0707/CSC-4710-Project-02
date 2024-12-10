# CSC 4710 - Project 2

## Getting Started

1. Start a web server with the contents of the "Frontend" directory
   - (Recommended) If you are using XAMPP, copy the contents of the "Frontend" directory into the XAMPP "htdocs" directory and start XAMPP
   - Alternatively, you can use Python HTTP Server by running the following command in the "Frontend" directory: `python3 -m http.server`
2. Create a MySQL database for the backend
   - Create a database called "csc_4710_project_02"
   - Create tables according to the "Development-Tools/SQL-Queries/tables.sql" file
3. Create the ".env" file in the "Backend" directory with the following structure:

```
PORT=5050
DB_USER=root
PASSWORD=
DATABASE=csc_4710_project_02
DB_PORT=3306
HOST=localhost
COOKIE_LIFETIME=86400000
```

4. Create the ".config.json" file in the "Frontend" directory with the same PORT as the ".env" file in the "Backend" directory and the following structure:

```
{
    "PORT": 5050
}
```

4. Start the backend service:

   - Install the node modules by running the following command in the "Backend" directory: `npm i`
   - Start the backend service by running the following command in the "Backend" directory: `npm start`

5. Access the webpage
