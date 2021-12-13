export const combineReducers = slices => (state, action) => {
  return (
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    )
  );
}

export const calculateTotal = items => {
  const total = items.reduce((a, b) => a + b.price * b.amount);
  return total;
};

export const request = async (url, data = null, method = 'GET') => {
  const token = localStorage.getItem('token') || '';
  const res = await fetch(`${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {'Authorization': token} : {}),
    },
    ...(method !== 'GET' ? {body: JSON.stringify(data)} : {}),
  });

  if (res.ok) {
    return await res.json();
  }

  const error = await res.text();
  throw new Error(error);
};

export const objectToQuery = params => {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
};