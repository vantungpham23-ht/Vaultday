// netlify/functions/test-neon.js
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  // Allow GET requests only
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

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
        message: 'Neon database connection successful!',
        data: rows[0],
        connectionString: connectionString.substring(0, 20) + '...' // Hide sensitive info
      })
    };
  } catch (error) {
    console.error('Neon connection error:', error);
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
  } finally {
    await pool.end();
  }
};
