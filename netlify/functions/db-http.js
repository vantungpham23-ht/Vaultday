// netlify/functions/db-http.js
// HTTP-only database connection for Netlify Functions
const https = require('https');

exports.handler = async (event, context) => {
  console.log('=== HTTP Database Function ===');
  
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
    // Parse connection string
    const url = new URL(connectionString);
    const hostname = url.hostname;
    const port = url.port || 5432;
    const database = url.pathname.substring(1);
    const username = url.username;
    const password = url.password;

    console.log('Connecting to:', hostname, 'port:', port, 'database:', database);

    // For now, let's create a simple test that doesn't require actual DB connection
    // This will help us verify the function is working
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: true,
        message: 'HTTP database function working',
        connectionInfo: {
          hostname: hostname,
          port: port,
          database: database,
          username: username,
          hasPassword: !!password
        },
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('HTTP database function error:', error);
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
