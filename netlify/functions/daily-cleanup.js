// netlify/functions/daily-cleanup.js
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  // Only allow POST requests (for security)
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
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
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
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
        error: 'NEON_DATABASE_URL environment variable is not set'
      })
    };
  }

  const pool = new Pool({ 
    connectionString,
    webSocketConstructor: require('ws').WebSocket
  });

  try {
    console.log('Starting daily cleanup...');
    
    // Run the daily cleanup function
    const { rows } = await pool.query('SELECT daily_cleanup()');
    
    // Get stats after cleanup
    const roomCount = await pool.query('SELECT COUNT(*) as count FROM rooms');
    const messageCount = await pool.query('SELECT COUNT(*) as count FROM messages');
    
    console.log('Daily cleanup completed successfully');
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: true,
        message: 'Daily cleanup completed successfully',
        stats: {
          rooms_remaining: parseInt(roomCount.rows[0].count),
          messages_remaining: parseInt(messageCount.rows[0].count),
          cleanup_time: new Date().toISOString()
        }
      })
    };
  } catch (error) {
    console.error('Daily cleanup error:', error);
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
    await pool.end();
  }
};
