// Test function to check database connection
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
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

  const pool = new Pool({ 
    connectionString,
    webSocketConstructor: require('ws').WebSocket
  });
  
  try {
    // Test basic connection
    const { rows } = await pool.query('SELECT now() as server_time, version() as pg_version');
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: true, 
        data: rows[0],
        connectionString: connectionString.substring(0, 20) + '...' // Hide sensitive info
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: false, 
        error: error.message,
        connectionString: connectionString.substring(0, 20) + '...'
      })
    };
  } finally {
    await pool.end();
  }
};
