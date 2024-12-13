# CSC 4710 - Project 2

Welcome to the website to David Smith's Driveway Sealing Company.
This is a website designed for an Introduction to Database Management Systems course (CSC 4710) at Wayne State University.
The website provides a dashboard for both David Smith and his clients to facilitate driveway sealing and financial negotiations.

## Contributors

- Parsa Nematollahe
- Paarth Desai

## Workload

- Collaboration time: approximately 10 hours

- Parsa's contributions

  - Approximately 29 hours spent
  - Implented Backend and Frontend functionality

- Paarth's contribution time

  - Approximately 26 hours spent
  - Worked on ER Diagram and SQL queries

## Getting Started

The dashboard for admin users, like David Smith, and client users is different.

On the "Quotes" section of the dashboard, client users can post quote requests for the driveways they want sealed and David Smith can respond to those quote requests. David Smith and the client can go back and forth with revisions until they either reject or accept.
If they eventually accept the terms a work order will be created and displayed on the "Work Orders" section of the dashboard.
After the work order has been completed, David Smith can submit a bill request which will mark the work order as completed and provide the client with a bill request that they will need to respond to which will be displayed on the "Bills" section of the dashboard.
David Smith and the client can go back and forth with revisions for the bill request and the bill response until the client eventually accepts the request.

Users will also be able to see relevant account information on the "Account" section of the dashboard.

Aside from the forms that clients and admins can use to submit their requests and responses, they will be provided tables that display relevant information like:

- Quote requests, responses, request revisions, and response revisions
- Work orders
- Bill requests, responses, request revisions, and response revisions

If the current user is logged in as an admin, they will have access to the following tables as well:

- Agreed quotes this month
- Work orders with largest driveway
- Overdue bills
- All users
- Biggest clients
- Difficult clients
- Prospective clients
- Good clients
- Bad clients

In order to register a client, you will have to go to the "Register" page.
You can be redirected to the "Register" page by either clicking on the "Register" button on the "Home" page or clicking on the "Register" button on the dashboard if you are logged in.

In order to login, you will have to go to the "Login" page and provide your login credentials.
You can be redirected to the "Login" page by either registering, clicking on the "Login" button on the "Home" page, or clicking on the "Login" button on the dashboard if you aren't logged in.

If you have logged in, the dashboard will also allow you to go to the "Home" page or log out by pressing the "Home" button and the "Logout" button, respectively.

## Installation

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
     - After you run `npm start`, the database will automatically create an admin user with username "admin" and password "admin"

5. Access the webpage

## Configuration

If you need the SQL queries to set up the database, they are located in the "Development-Tools/SQL-Queries" directory.

After you have run the appropriate SQL queries to set up the database you may want to quickly configure the database to have many quotes, work orders, and bills. One way to do that is by using the HTTP requests in the "Development-Tools/HTTP-Requests" directory.

If you run each of the "stage-\*.sh" files in order from within the "Development-Tools/HTTP-Requests" directory and you run the "stage-\*-post.sql" query in the MySQL query console after the corresponding "stage-\*.sh" file, you will have almost the same configuration as the one presented in the submitted video.
If you don't have cURL installed or you can't run ".sh" files, you can manually enter the requests into the corresponding forms on the website.

There are also HTTP requests you can send by running the ".sh" files in the "Development-Tools/HTTP-Requests/quotes" and "Development-Tools/HTTP-Requests/bills" directories. Just make sure you are running them within in the "Development-Tools/HTTP-Requests" directory or else they won't work due to the relative file naming convention used in the scripts.
