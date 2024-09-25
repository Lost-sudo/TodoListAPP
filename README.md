# Todo List App

This is a simple Todo List application built with Node.js and PostgreSQL.

## Features
- Add, edit, and delete todo items.
- Display a list of todo items from a PostgreSQL database.
- Data persistence with PostgreSQL.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript) for templating

## Prerequisites

To run this project, you'll need to have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/todo-list-app.git
    ```

2. Navigate into the project directory:

    ```bash
    cd todo-list-app
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up your PostgreSQL database and update your connection details in the code.

## Running the Application

1. Start the PostgreSQL server.

2. Run the application:

    ```bash
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Database Setup

Make sure you have a PostgreSQL database set up with the following table:

```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
