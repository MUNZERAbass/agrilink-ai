(async ()=>{
  try {
    const res = await fetch('http://localhost:5000/api/health');
    console.log('Status:', res.status);
    const json = await res.json();
    console.log('Body:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Health check failed:', err.message || err);
  }
})();
