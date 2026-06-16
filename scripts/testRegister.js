(async ()=>{
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@agrilink.com',
        password: '123456',
        role: 'customer',
        phone: '+250788000000',
        district: 'Kigali'
      })
    });

    console.log('Status:', res.status);
    const text = await res.text();
    try { console.log('Body:', JSON.stringify(JSON.parse(text), null, 2)); }
    catch { console.log('Body (raw):', text); }
  } catch (err) {
    console.error('Request failed:', err.message || err);
  }
})();
