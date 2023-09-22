const API_URL = 'http://localhost:1337'

export async function getBudgets(tripId) {
    const response = await fetch(`${API_URL}/api/budgets?trip_id=${tripId}`);
    return response.json();
}

export async function createBudget(entry) {
    const response = await fetch(`${API_URL}/api/budgets`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  }

export async function updateBudget(entry, id) {
  const response = await fetch(`${API_URL}/api/budgets/update?budget_id=${id}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json' 
    },
    body: JSON.stringify(entry)
  });
  return response.json();
}


export async function deleteBudget(id) {
  const response = await fetch(`${API_URL}/api/budgets/delete`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({id: id}),
  });
  return response.json();
}
