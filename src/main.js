import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../src/img/octagon.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formSearch = document.querySelector('.form');
const imageList = document.querySelector('.gallery');
const preload = document.querySelector('.loader');
const nextBtn = document.querySelector('#next-btn');

let page = 0;
let searchValue = null;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

formSearch.addEventListener('submit', handleSearch);
nextBtn.addEventListener('click', nextPage);

async function handleSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.input.value;

  searchValue = searchQuery;
  page = 1;

  nextBtn.classList.add('is-hidden');
  const form = event.currentTarget;

  imageList.innerHTML = '';

  if (!searchQuery.trim()) {
    iziToast.show({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#808080',
      backgroundColor: '#e7fc44',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  preload.classList.remove('is-hidden');

  try {
    const response = await fetchImages();
    if (response.hits.length === 0) {
      iziToast.show({
        iconUrl: icon,
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topRight',
        timeout: 5000,
      });
      form.reset();
      return;
    }

    imageList.innerHTML = createMarkup(response.hits);
    gallery.refresh();

    if (response.hits.length >= 40) {
      nextBtn.classList.remove('is-hidden');
    }

    scrollBy();
    form.reset();
  } catch (err) {
    handleError(err);
  } finally {
    preload.classList.add('is-hidden');
  }
}

async function fetchImages() {
  const BASE_URL = 'https://pixabay.com/api';
  const searchParams = new URLSearchParams({
    key: '41943973-f526c1169a7b37d0261d5a9a5',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  });
  const res = await axios.get(
    `${BASE_URL}/?${searchParams}&q=${searchValue}&page=${page}`
  );
  return res.data;
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
           <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        <div class="container-additional-info">
        <div class="container-descr-inner"><p class="description">Likes</p><span class="description-value">${likes}</span></div>
        
        <div class="container-descr-inner"><p class="description">Views</p><span class="description-value">${views}</span></div>
        

        <div class="container-descr-inner"><p class="description">Comments</p><span class="description-value">${comments}</span></div>
        

        <div class="container-descr-inner"><p class="description">Downloads</p><span class="description-value">${downloads}</span></div>
        
        </div>
      </li>`
    )
    .join('');
}

function handleError(err) {
  console.error(err);
  imageList.innerHTML = '';
  iziToast.show({
    iconUrl: icon,
    theme: 'dark',
    message: err.stack,
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    timeout: 5000,
  });

  nextBtn.removeEventListener('click', nextPage);
  nextBtn.classList.add('is-hidden');
}

async function nextPage() {
  preload.classList.remove('is-hidden');
  nextBtn.classList.add('is-hidden');
  page += 1;

  try {
    const res = await fetchImages();

    if (page * 40 >= res.totalHits) {
      iziToast.show({
        title: '❕',
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#4e75ff',
        position: 'topRight',
        timeout: 5000,
      });
        //   imageList.innerHTML += createMarkup(res.hits);
        imageList.insertAdjacentHTML('beforeend', markup);
      gallery.refresh();
      nextBtn.classList.add('is-hidden');

      scrollBy();

      return;
    }
    // изменил insertAdjacentHTML
    imageList.innerHTML += createMarkup(res.hits);
    gallery.refresh();

    scrollBy();

    nextBtn.classList.remove('is-hidden');
  } catch (err) {
    handleError(err);
  } finally {
    preload.classList.add('is-hidden');
  }
}

function scrollBy() {
    const rect = document
      .querySelector('.gallery-link')
      .getBoundingClientRect();
  window.scrollBy({
    top: rect.height * 2,
    left: 0,
    behavior: 'smooth',
  });
}
