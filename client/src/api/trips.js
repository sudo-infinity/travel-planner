const API_URL = 'http://localhost:1337'

export async function listTrips() {
    const response = await fetch(`${API_URL}/api/trips`)
    return response.json();
}

export async function createTrip(entry) {
    const apiKey = entry.apiKey;
    delete entry.apiKey;
    const response = await fetch(`${API_URL}/api/trips`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-API-KEY': apiKey, 
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  }
