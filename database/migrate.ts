/**
 * Script to run database migrations (create tables).
 */

import { query } from '../backend/src/config/db';
import fs from 'fs/promises';
import path from 'path';

async function migrateDatabase() {
  console.log('Running database migrations...');
  try {
    const schemaSql = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
    await query(schemaSql);
    console.log('Database migration complete.');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

migrateDatabase();
