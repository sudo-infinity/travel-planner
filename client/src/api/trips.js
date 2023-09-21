const API_URL = 'http://localhost:1337'

export async function listTrips() {
    const userId = localStorage.getItem("id");
    const response = await fetch(`${API_URL}/api/trips/user-trips?user_id=${userId}`);
    return response.json();
}

export async function getTrip(tripId) {
  const response = await fetch(`${API_URL}/api/trips/current-trip?trip_id=${tripId}`);
  return response.json();
}

export async function createTrip(entry) {
    const apiKey = entry.apiKey;
    delete entry.apiKey;
    const response = await fetch(`${API_URL}/api/trips/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-API-KEY': apiKey, 
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  }

export async function updateTrip(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  const response = await fetch(`${API_URL}/api/trips/update`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': apiKey, 
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}


export async function deleteTrip(id) {
  const response = await fetch(`${API_URL}/api/trips/delete`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({id: id}),
  });
  return response.json();
}
