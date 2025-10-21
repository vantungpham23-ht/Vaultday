// netlify/functions/test-env.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ok: true,
      message: 'Environment test',
      hasNeonUrl: !!process.env.NEON_DATABASE_URL,
      nodeVersion: process.version,
      timestamp: new Date().toISOString(),
      // Don't expose the actual URL for security
      neonUrlLength: process.env.NEON_DATABASE_URL ? process.env.NEON_DATABASE_URL.length : 0
    })
  };
};
