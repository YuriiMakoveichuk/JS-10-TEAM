import axios from 'axios';

// export function getPhotos(query, page) {
//   const API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
//   const BASE_URL = 'https://api.unsplash.com';
//   const END_POIND = '/search/photos';

//   const params = new URLSearchParams({
//     client_id: API_KEY,
//     query,
//     page,
//     per_page: 12,
//     orientation: 'portrait',
//   });
//   return fetch(`${BASE_URL}${END_POIND}?${params}`).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     return res.json();
//   });
// }
axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] =
  'Client-ID LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';

export async function getPhotos(query, page) {
  return await axios.get('/search/photos', {
    params: {
      query,
      page,
      per_page: 12,
      orientation: 'portrait',
    },
  });
}
