import { searchImg } from "./js/image-api";

const formEl = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');
const inputEl = document.querySelector('.search-form input');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', querySubmit);

async function querySubmit (event) {
    event.preventDefault();
    galleryEl.innerHTML = '';
    const queryImg = inputEl.value;
    const resp = await searchImg(queryImg).then(( {data} ) => creatImagesMurkup(data.hits)).catch(error => console.log(error));
    
};

function creatImagesMurkup (imagesArray) {
    const markup = imagesArray.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item"> ${likes}
      <b>Likes</b> 
    </p>
    <p class="info-item"> ${views}
      <b>Views</b> 
    </p>
    <p class="info-item"> ${comments}
      <b>Comments</b> 
    </p>
    <p class="info-item"> ${downloads}
      <b>Downloads</b> 
    </p>
  </div>
</div>`
    }).join('');
    galleryEl.insertAdjacentHTML('afterbegin', markup);
}