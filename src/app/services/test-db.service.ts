// Test Netlify function
async function testDbQuery() {
  try {
    const res = await fetch('/.netlify/functions/db-query', { method: 'GET' });
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error('Error testing db-query:', error);
    return null;
  }
}

// Test with POST request
async function testDbQueryPost() {
  try {
    const res = await fetch('/.netlify/functions/db-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: 'SELECT now() as server_time, current_database() as db_name',
        params: []
      })
    });
    const json = await res.json();
    console.log('POST result:', json);
    return json;
  } catch (error) {
    console.error('Error testing db-query POST:', error);
    return null;
  }
}

// Export functions for use
export { testDbQuery, testDbQueryPost };

// Auto-run test if in browser
if (typeof window !== 'undefined') {
  // Run test after a short delay to ensure page is loaded
  setTimeout(() => {
    console.log('Testing Netlify function...');
    testDbQuery();
  }, 1000);
}
