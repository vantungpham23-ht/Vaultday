// netlify/functions/debug.js
exports.handler = async (event, context) => {
  console.log('=== Debug Function ===');
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
      message: 'Debug function working',
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      path: event.path,
      hasBody: !!event.body,
      environment: {
        nodeVersion: process.version,
        hasNeonUrl: !!process.env.NEON_DATABASE_URL,
        envKeys: Object.keys(process.env).filter(key => key.includes('NEON'))
      }
    })
  };
};
