-- netlify/functions/update-schema.js
const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  console.log('=== Update Schema Function ===');
  
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
    // Add is_public column to rooms table if it doesn't exist
    const alterQuery = `
      ALTER TABLE rooms 
      ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true
    `;
    
    console.log('Executing schema update:', alterQuery);
    await pool.query(alterQuery);
    
    // Update existing rooms to be public by default
    const updateQuery = `
      UPDATE rooms 
      SET is_public = true 
      WHERE is_public IS NULL
    `;
    
    console.log('Updating existing rooms:', updateQuery);
    await pool.query(updateQuery);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: true, 
        message: 'Schema updated successfully',
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Schema update error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  } finally {
    await pool.end();
  }
};
