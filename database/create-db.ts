/**
 * Script to create the MySQL database.
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
  });

  const dbName = process.env.DB_NAME || 'city_info';

  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' created or already exists.`);
  } catch (error) {
    console.error(`Error creating database '${dbName}':`, error);
  } finally {
    await connection.end();
  }
}

createDatabase();
