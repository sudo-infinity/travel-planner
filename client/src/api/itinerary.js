const API_URL = 'http://localhost:1337'

export async function getItineraries(tripId) {
    const response = await fetch(`${API_URL}/api/itineraries?trip_id=${tripId}`);
    return response.json();
}

export async function createItinerary(entry) {
    const response = await fetch(`${API_URL}/api/itineraries`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  }

export async function updateItinerary(entry, id) {
  const response = await fetch(`${API_URL}/api/itineraries/update?itinerary_id=${id}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json' 
    },
    body: JSON.stringify(entry)
  });
  return response.json();
}


export async function deleteItinerary(id) {
  const response = await fetch(`${API_URL}/api/itineraries/delete`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({id: id}),
  });
  return response.json();
}
