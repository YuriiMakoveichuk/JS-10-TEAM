import { getPhotos } from './unsplash-api.js';
import { formEl, listEl, loadMoreBtn } from './refs.js';
import { createGalleryCards } from './render-fanction.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from './loader.js';
import { showBtn, hideBtn } from './loadmore.js';

let page = 1;
let searchQuery = null;

formEl.addEventListener('submit', async event => {
  event.preventDefault();
  listEl.innerHTML = '';
  showLoader();
  page = 1;
  searchQuery = event.currentTarget.elements['user-search-query'].value.trim();
  try {
    const res = await getPhotos(searchQuery, page);
    if (res.total > 0) {
      iziToast.success({
        position: 'topRight',
        message: `We find ${res.data.total} photos`,
      });
    }
    if (res.data.results.length === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    listEl.innerHTML = createGalleryCards(res.data.results);
    if (res.data.total > 12) {
      showBtn();
    }
  } catch (error) {
    console.log(error);
  } finally {
    event.target.reset();
    hideLoader();
  }
  // getPhotos(searchQuery, page)
  //   .then(res => {})
  //   .catch(err => console.log(err))
  //   .finally(() => {
  //     event.target.reset();
  //     hideLoader();
  //   });
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  showLoader();
  try {
    const res = await getPhotos(searchQuery, page);
    listEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(res.data.results)
    );
    const lastPage = Math.ceil(res.data.total / 12);
    if (page === lastPage) {
      hideBtn();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }

  // getPhotos(searchQuery, page).then(res => {
  //   // listEl.insertAdjacentHTML('beforeend', createGalleryCards(res.results));
  //   // const lastPage = Math.ceil(res.total / 12);
  //   // if (page === lastPage) {
  //   //   hideBtn();
  //   //   iziToast.info({
  //   //     position: 'topRight',
  //   //     message: "We're sorry, but you've reached the end of search results.",
  //   //   });
  //   // }
  // });
});
