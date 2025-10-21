// netlify/functions/test-schema.js
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  console.log('=== Schema Test Function ===');
  
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

  try {
    const pool = new Pool({ 
      connectionString
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
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'rooms' 
      AND table_schema = 'public'
    `;
    
    const { rows: roomsColumns } = await pool.query(roomsColumnsQuery);
    
    await pool.end();
    
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
          hasRoomsTable: tables.some(t => t.table_name === 'rooms'),
          hasMessagesTable: tables.some(t => t.table_name === 'messages')
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
  }
};
