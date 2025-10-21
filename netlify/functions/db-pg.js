// netlify/functions/db-pg.js
// Use standard pg package instead of @neondatabase/serverless
const { Pool } = require('pg');

exports.handler = async (event, context) => {
  console.log('=== PG Database Function ===');
  
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
    // Use standard pg Pool
    pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('PG Pool created successfully');

    let query, params = [];

    if (event.httpMethod === 'GET') {
      // For GET requests, use a simple test query
      query = 'SELECT 1 as test_value, now() as server_time';
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
    console.error('PG Database query error:', error);
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
    if (pool) {
      console.log('Closing PG database connection...');
      await pool.end();
      console.log('PG Database connection closed');
    }
  }
};
