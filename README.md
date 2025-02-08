# Book Loan Management System

- [Book Loan Management System](#book-loan-management-system)
  - [Overview](#overview)
  - [Features](#features)
  - [Objective](#objective)
  - [Technologies Used](#technologies-used)
  - [Setup Instructions](#setup-instructions)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
      - [From Console](#from-console)
  - [Notes](#notes)

## Overview

The Book Loan Management System is a beginner-friendly project aimed at learning React and Spring Boot by building a full-stack web application. This application enables users to borrow books, return them, and address inquiries. Additionally, users are charged fees for overdue book returns. An admin panel is available for authorized administrators to manage book inventory, respond to inquiries, and handle customer requests.

## Features

- **Borrowing Books**: Users can borrow books for reading.
- **Returning Books**: Users can return borrowed books.
- **Inquiry Management**: Users can submit inquiries and receive responses.
- **Admin Panel**:
  - Accessible only to authorized administrators.
  - Book Management:
    - Update available copies.
    - Delete books.
  - Inquiry Handling: Admins can respond to inquiries and customer requests.

## Objective

This project aims to provide practical experience in:

- Developing full-stack web applications.
- Integrating frontend with backend functionalities.
- Implementing user authentication and authorization mechanisms.

## Technologies Used

- Frontend: React
- Backend: Spring Boot
- Database: MySQL (Docker)
- Authentication: Okta
- Payment: Stripe

## Setup Instructions

### Database Setup

The database is not persistent and needs to be set up each time the application is run. Follow these steps to set up the database:

1. **Run MySQL Docker Container**:
    ```sh
    docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your-password -e MYSQL_DATABASE=reactlibrarydatabase -p 3306:3306 -d mysql:latest
    ```

2. **Run SQL Scripts**:
    Navigate to the `starter-files/Scripts` directory and run all the SQL scripts to set up the database schema and initial data:
    ```sh
    Get-Content React-Springboot-Add-Tables-Script-1.sql | docker exec -i library-app-db-1 mysql -u root -p123456 reactlibrarydatabase
    Get-Content React-SpringBoot-Add-Books-Script-2.sql | docker exec -i library-app-db-1 mysql -u root -p123456 reactlibrarydatabase
    Get-Content React-SpringBoot-Add-Books-Script-3.sql | docker exec -i library-app-db-1 mysql -u root -p123456 reactlibrarydatabase
    Get-Content React-SpringBoot-Add-Books-Script-4.sql | docker exec -i library-app-db-1 mysql -u root -p123456 reactlibrarydatabase
    Get-Content React-SpringBoot-Add-Books-Script-5.sql | docker exec -i library-app-db-1 mysql -u root -p123456 reactlibrarydatabase
    ```

### Running the Application

You can run the application either from the console

#### From Console

1. **Backend**:
    ```sh
    cd backend
    ./mvnw spring-boot:run
    ```

2. **Frontend**:
    ```sh
    cd frontend
    npm start
    ```

## Notes

- Ensure that the environment variables for the API URLs and other configurations are set correctly in the `.env` files for both the frontend and backend.
- The database setup scripts must be run every time the MySQL container is restarted, as the database is not persistent.





