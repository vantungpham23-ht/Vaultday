// netlify/functions/migrate-schema.js
// Database schema migration function
const { Pool } = require('pg');

exports.handler = async (event, context) => {
  console.log('=== Schema Migration Function ===');
  
  const connectionString = process.env.NEON_DATABASE_URL;
  
  if (!connectionString) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: false, 
        error: 'NEON_DATABASE_URL environment variable is not set'
      })
    };
  }

  let pool;
  try {
    pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('PG Pool created for migration');

    // Check if tables exist
    const checkTablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('rooms', 'messages')
    `;
    
    const { rows: existingTables } = await pool.query(checkTablesQuery);
    console.log('Existing tables:', existingTables.map(t => t.table_name));

    // Create rooms table if it doesn't exist
    if (!existingTables.some(t => t.table_name === 'rooms')) {
      console.log('Creating rooms table...');
      await pool.query(`
        CREATE TABLE rooms (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP DEFAULT NOW(),
          name VARCHAR(255) NOT NULL,
          password VARCHAR(255),
          created_by VARCHAR(255),
          is_public BOOLEAN DEFAULT TRUE
        )
      `);
      console.log('Rooms table created');
    }

    // Create messages table if it doesn't exist
    if (!existingTables.some(t => t.table_name === 'messages')) {
      console.log('Creating messages table...');
      await pool.query(`
        CREATE TABLE messages (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP DEFAULT NOW(),
          content TEXT NOT NULL,
          room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
          user_id VARCHAR(255)
        )
      `);
      console.log('Messages table created');
    }

    // Check if is_public column exists in rooms table
    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'rooms' 
      AND table_schema = 'public'
      AND column_name = 'is_public'
    `;
    
    const { rows: existingColumns } = await pool.query(checkColumnQuery);
    
    if (existingColumns.length === 0) {
      console.log('Adding is_public column to rooms table...');
      await pool.query(`
        ALTER TABLE rooms 
        ADD COLUMN is_public BOOLEAN DEFAULT TRUE
      `);
      console.log('is_public column added');
    } else {
      console.log('is_public column already exists');
    }

    // Update existing rooms to be public if they don't have is_public set
    await pool.query(`
      UPDATE rooms 
      SET is_public = TRUE 
      WHERE is_public IS NULL
    `);

    // Get final schema info
    const finalSchemaQuery = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'rooms' 
      AND table_schema = 'public'
      ORDER BY ordinal_position
    `;
    
    const { rows: finalSchema } = await pool.query(finalSchemaQuery);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: true,
        message: 'Schema migration completed successfully!',
        data: {
          existingTables: existingTables.map(t => t.table_name),
          finalSchema: finalSchema,
          migrationSteps: [
            'Checked existing tables',
            'Created rooms table if needed',
            'Created messages table if needed',
            'Added is_public column if needed',
            'Updated existing rooms to be public'
          ]
        }
      })
    };

  } catch (error) {
    console.error('Schema migration error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: false,
        error: error.message,
        details: error.stack
      })
    };
  } finally {
    if (pool) {
      console.log('Closing migration database connection...');
      await pool.end();
      console.log('Migration database connection closed');
    }
  }
};
