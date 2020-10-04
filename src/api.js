const BASE_URL = process.env.REACT_APP_API_BASE_URL;

let getToken = () => {
  return JSON.parse(localStorage.getItem('aiportal:token') || '""');
};

let get = async (path, data = null) => {
  if (data) {
    path +=
      '?' +
      Object.entries(data)
        .map((kv) => kv.map(encodeURIComponent).join('='))
        .join('&');
  }
  let resp = await fetch(BASE_URL + path, {
    headers: { Authorization: 'Bearer ' + getToken() },
  });
  return await resp.json();
};

let post = async (path, data = {}) => {
  let resp = await fetch(BASE_URL + path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
  });
  return await resp.json();
};

window.api = { get, post };

export default window.api;
