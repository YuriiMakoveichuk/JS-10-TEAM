import { getPhotos } from './unsplash-api.js';
import { formEl, listEl } from './refs.js';
import { createGalleryCards } from './render-fanction.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery =
    event.currentTarget.elements['user-search-query'].value.trim();

  getPhotos(searchQuery)
    .then(res => {
      if (res.results.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      listEl.innerHTML = createGalleryCards(res.results);
    })
    .catch(err => console.log(err))
    .finally(() => {
      event.target.reset();
    });
});
