export function getPhotos(query, page) {
  const API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  const BASE_URL = 'https://api.unsplash.com';
  const END_POIND = '/search/photos';

  const params = new URLSearchParams({
    client_id: API_KEY,
    query,
    page,
    per_page: 12,
    orientation: 'portrait',
  });
  return fetch(`${BASE_URL}${END_POIND}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
