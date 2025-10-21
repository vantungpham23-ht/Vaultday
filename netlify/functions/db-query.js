// Netlify function - query Neon directly
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  console.log('=== DB Query Function Started ===');
  console.log('Method:', event.httpMethod);
  console.log('Path:', event.path);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  
  try {
    // Allow GET and POST requests
    if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
      console.log('Method not allowed:', event.httpMethod);
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
      console.log('Handling CORS preflight');
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
    const connectionString = process.env.NEON_DATABASE_URL;
    console.log('Has connection string:', !!connectionString);
    console.log('Connection string length:', connectionString ? connectionString.length : 0);

    if (!connectionString) {
      console.error('NEON_DATABASE_URL environment variable is not set');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          ok: false, 
          error: 'NEON_DATABASE_URL environment variable is not set',
          debug: {
            hasEnv: !!process.env.NEON_DATABASE_URL,
            envKeys: Object.keys(process.env).filter(key => key.includes('NEON'))
          }
        })
      };
    }

  const pool = new Pool({ 
    connectionString,
    webSocketConstructor: require('ws').WebSocket
  });
  
  try {
    let query, params = [];

    if (event.httpMethod === 'GET') {
      // For GET requests, use a simple test query
      query = 'SELECT now() as server_time';
      params = [];
      console.log('Executing GET query:', query);
    } else {
      // For POST requests, parse the request body
      console.log('Request body:', event.body);
      const body = JSON.parse(event.body);
      query = body.query;
      params = body.params || [];

      console.log('Query:', query);
      console.log('Params:', params);

      if (!query) {
        console.error('No query provided');
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
    console.log('Executing query...');
    const { rows } = await pool.query(query, params);
    console.log('Query executed successfully, rows:', rows.length);

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
        method: event.httpMethod,
        timestamp: new Date().toISOString()
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
        details: error.stack,
        timestamp: new Date().toISOString()
      })
    };
  } finally {
    console.log('Closing database connection...');
    await pool.end();
    console.log('Database connection closed');
  }
  
  } catch (handlerError) {
    console.error('Handler error:', handlerError);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: false, 
        error: 'Handler error: ' + handlerError.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
