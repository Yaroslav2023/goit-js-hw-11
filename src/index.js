import { searchImg, loadMoreImgApi } from "./js/image-api";
import Notiflix from 'notiflix';



const formEl = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');
const inputEl = document.querySelector('.search-form input');
const galleryEl = document.querySelector('.gallery');

let searchQuery = '';
btnLoadMore.classList.add('visually-hidden');

formEl.addEventListener('submit', querySubmit);

btnLoadMore.addEventListener("click", loadMoreImg);

async function querySubmit (event) {
    event.preventDefault();
    galleryEl.innerHTML = '';
    searchQuery = inputEl.value;
    btnLoadMore.classList.add('visually-hidden');

    if(searchQuery === "") {
      return
    }
    const resp = await searchImg(searchQuery).then(( {data} ) => {
      creatImagesMurkup(data.hits);
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`, 2000);
      if(data.hits.length === 40) {
        btnLoadMore.classList.remove('visually-hidden');};
      if(data.hits.length === 0) {
        btnLoadMore.classList.add('visually-hidden');
        throw new Error(response.status);}
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.", 2000));
};

async function loadMoreImg () {
  btnLoadMore.classList.add('visually-hidden');
  const respLoadMore = await loadMoreImgApi(searchQuery).then(({ data }) => {
    creatImagesMurkup(data.hits)
    if (data.hits.length === 40) {
      btnLoadMore.classList.remove('visually-hidden');
    };
    if (data.hits.length < 40) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", 2000);
    }
  }).catch(error => console.log(error));
};


function creatImagesMurkup (imagesArray) {
    const markup = imagesArray.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  <div class="info">
    <p class="info-item"> 
      <b>Likes</b><br> ${likes}
    </p>
    <p class="info-item"> 
      <b>Views</b><br> ${views}
    </p>
    <p class="info-item"> 
      <b>Comments</b><br> ${comments}
    </p>
    <p class="info-item"> 
      <b>Downloads</b><br> ${downloads}
    </p>
  </div>
</div>`
    }).join('');
    galleryEl.insertAdjacentHTML('beforeend', markup);
}