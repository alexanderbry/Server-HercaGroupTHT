# Server-HercaGroupTHT

# Project Installation Guide

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [PostgreSQL](https://www.postgresql.org/)

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/alexanderbry/Server-HercaGroupTHT.git
cd Server-HercaGroupTHT
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<your_name>
DB_PASSWORD=<your_password>
DB_NAME=<your_new_database>
PORT=3000
NODE_ENV=development
SECRET_KEY=helloworld
```

### 4. Create the Database
```sh
npx sequelize-cli db:create
```

### 5. Run Migrations
```sh
npx sequelize-cli db:migrate
```

### 6. Seed the Database (Optional: If you have seeders)
```sh
npx sequelize-cli db:seed:all
```

### 7. Start the Server
```sh
npm start
```

Your project should now be running successfully! 🚀

