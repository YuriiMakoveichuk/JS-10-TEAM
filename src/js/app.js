import { getPhotos } from './unsplash-api.js';

getPhotos('cat')
  .then(res => console.log(res))
  .catch(err => console.log(err));
