// netlify/functions/test-db.js
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  console.log('=== Database Test Function ===');
  
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
        error: 'NEON_DATABASE_URL environment variable is not set',
        env: Object.keys(process.env).filter(key => key.includes('NEON'))
      })
    };
  }

  try {
    // Try to create pool without WebSocket first
    const pool = new Pool({ 
      connectionString
    });

    // Test basic connection
    const { rows } = await pool.query('SELECT now() as server_time, version() as pg_version');
    
    await pool.end();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: true,
        message: 'Database connection successful!',
        data: rows[0],
        connectionString: connectionString.substring(0, 20) + '...'
      })
    };
  } catch (error) {
    console.error('Database connection error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: false,
        error: error.message,
        details: error.stack,
        connectionString: connectionString ? connectionString.substring(0, 20) + '...' : 'Not set'
      })
    };
  }
};