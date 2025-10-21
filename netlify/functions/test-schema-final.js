// netlify/functions/test-schema-final.js
// Test schema after migration
const { Pool } = require('pg');

exports.handler = async (event, context) => {
  console.log('=== Final Schema Test Function ===');
  
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

    // Test if tables exist
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('rooms', 'messages')
    `;
    
    const { rows: tables } = await pool.query(tablesQuery);
    
    // Test rooms table structure
    const roomsColumnsQuery = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'rooms' 
      AND table_schema = 'public'
      ORDER BY ordinal_position
    `;
    
    const { rows: roomsColumns } = await pool.query(roomsColumnsQuery);
    
    // Test messages table structure
    const messagesColumnsQuery = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'messages' 
      AND table_schema = 'public'
      ORDER BY ordinal_position
    `;
    
    const { rows: messagesColumns } = await pool.query(messagesColumnsQuery);

    // Test a simple query on rooms table
    const testQuery = `
      SELECT COUNT(*) as room_count 
      FROM rooms
    `;
    
    const { rows: testResult } = await pool.query(testQuery);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: true,
        message: 'Schema test successful!',
        data: {
          tables: tables.map(t => t.table_name),
          roomsColumns: roomsColumns,
          messagesColumns: messagesColumns,
          hasRoomsTable: tables.some(t => t.table_name === 'rooms'),
          hasMessagesTable: tables.some(t => t.table_name === 'messages'),
          hasIsPublicColumn: roomsColumns.some(c => c.column_name === 'is_public'),
          roomCount: testResult[0].room_count
        }
      })
    };

  } catch (error) {
    console.error('Schema test error:', error);
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
      await pool.end();
    }
  }
};
