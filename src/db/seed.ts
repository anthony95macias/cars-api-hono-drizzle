// src/db/seed.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { seed } from 'drizzle-seed';
import * as schema from './schema';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({
  path: '.dev.vars',
});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const main = async () => {
  try {
    console.log('Seeding data...');
    await seed(db, schema).refine((f) => ({
      products: {
        columns: {
          name: f.valuesFromArray({
            values: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
            isUnique: true,
          }),
          price: f.number({
            minValue: 5.99,
            maxValue: 20.99,
            precision: 100,
          }),
          description: f.valuesFromArray({
            values: [
              'This is the description for Product A.',
              'This is the description for Product B.',
              'This is the description for Product C.',
              'This is the description for Product D.',
              'This is the description for Product E.',
            ],
            isUnique: true,
          }),
        },
        count: 5,
      },
    }));
    console.log('Seeding successful!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

main();