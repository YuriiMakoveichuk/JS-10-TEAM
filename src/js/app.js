import { getPhotos } from './unsplash-api.js';
import { formEl, listEl, loadMoreBtn } from './refs.js';
import { createGalleryCards } from './render-fanction.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from './loader.js';
import { showBtn, hideBtn } from './loadmore.js';

let page = 1;
let searchQuery = null;

formEl.addEventListener('submit', event => {
  event.preventDefault();
  listEl.innerHTML = '';
  showLoader();
  page = 1;
  searchQuery = event.currentTarget.elements['user-search-query'].value.trim();

  getPhotos(searchQuery, page)
    .then(res => {
      if (res.total > 0) {
        iziToast.success({
          position: 'topRight',
          message: `We find ${res.total} photos`,
        });
      }
      if (res.results.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      listEl.innerHTML = createGalleryCards(res.results);
      if (res.total > 12) {
        showBtn();
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      event.target.reset();
      hideLoader();
    });
});

loadMoreBtn.addEventListener('click', () => {
  page++;
  getPhotos(searchQuery, page).then(res => {
    listEl.insertAdjacentHTML('beforeend', createGalleryCards(res.results));
    const lastPage = Math.ceil(res.total / 12);
    if (page === lastPage) {
      hideBtn();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  });
});
