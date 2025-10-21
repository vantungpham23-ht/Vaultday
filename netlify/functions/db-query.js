// Netlify function - query Neon directly
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  // Allow GET and POST requests
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
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

  // NEVER expose this on frontend
  const connectionString = process.env.NEON_DATABASE_URL; // e.g. postgresql://user:pass@...neon.tech/db

  if (!connectionString) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ok: false, error: 'NEON_DATABASE_URL environment variable is not set' })
    };
  }

  const pool = new Pool({ connectionString });
  
  try {
    let query, params = [];

    if (event.httpMethod === 'GET') {
      // For GET requests, use a simple test query
      query = 'SELECT now() as server_time';
      params = [];
    } else {
      // For POST requests, parse the request body
      const body = JSON.parse(event.body);
      query = body.query;
      params = body.params || [];

      console.log('Query:', query);
      console.log('Params:', params);

      if (!query) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ok: false, error: 'Query is required' })
        };
      }
    }

    // Execute the query
    const { rows } = await pool.query(query, params);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: true, 
        data: rows,
        query: query,
        params: params,
        method: event.httpMethod
      })
    };

  } catch (error) {
    console.error('Database query error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
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
