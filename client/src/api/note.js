const API_URL = 'http://localhost:1337'

export async function createNote(entry) {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  }

export async function updateNote(entry, index) {
const response = await fetch(`${API_URL}/api/notes/update?note_index=${index}`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json' 
    },
    body: JSON.stringify(entry)
});
    return response.json();
}

  
export async function deleteNote(noteIndex, tripId) {
    const response = await fetch(`${API_URL}/api/notes/delete`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        },
        body: JSON.stringify({noteIndex: noteIndex, trip_id: tripId}),
    });
    return response.json();
}
  