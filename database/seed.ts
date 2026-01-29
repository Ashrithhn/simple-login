/**
 * Script to seed initial data into the database.
 */

import { query } from '../backend/src/config/db';
import fs from 'fs/promises';
import path from 'path';

async function seedDatabase() {
  console.log('Seeding database with initial data...');
  try {
    const seedSql = await fs.readFile(path.join(__dirname, 'seed.sql'), 'utf8');
    await query(seedSql);
    console.log('Database seeding complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
