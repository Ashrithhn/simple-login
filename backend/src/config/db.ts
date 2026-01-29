/**
 * Database connection configuration for MySQL.
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'city_info',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

export async function initializeDatabase(): Promise<void> {
  console.log('Initializing database connection...');
  try {
    await pool.getConnection();
    console.log('Database connection successful.');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
