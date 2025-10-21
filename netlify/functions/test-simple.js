// netlify/functions/test-simple.js
exports.handler = async (event, context) => {
  console.log('=== Simple Test Function ===');
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ok: true,
      message: 'Simple test function working',
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      path: event.path,
      hasNeonUrl: !!process.env.NEON_DATABASE_URL,
      nodeVersion: process.version,
      environment: {
        nodeVersion: process.version,
        hasNeonUrl: !!process.env.NEON_DATABASE_URL,
        envKeys: Object.keys(process.env).filter(key => key.includes('NEON'))
      }
    })
  };
};
