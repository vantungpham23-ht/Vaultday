// netlify/functions/test-db-simple.js
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  console.log('=== Simple DB Test Function ===');
  
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
    // Try the simplest possible connection
    const pool = new Pool({ 
      connectionString
    });

    // Test basic connection with a simple query
    const { rows } = await pool.query('SELECT 1 as test_value, now() as server_time');
    
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
