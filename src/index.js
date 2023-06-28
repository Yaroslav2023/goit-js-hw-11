import { searchImg, loadMoreImg } from "./js/image-api";

const formEl = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');
const inputEl = document.querySelector('.search-form input');
const galleryEl = document.querySelector('.gallery');

let searchQuery = '';

formEl.addEventListener('submit', querySubmit);

btnLoadMore.addEventListener("click", loadMoreImg);

async function querySubmit (event) {
    event.preventDefault();
    galleryEl.innerHTML = '';
    searchQuery = inputEl.value;
    const resp = await searchImg(searchQuery).then(( {data} ) => creatImagesMurkup(data.hits)).catch(error => console.log(error));
    
};

function loadMoreImg (event) {
  console.log('Hi');
  // const respLoadMore = await searchImg(searchQuery).then(( {data} ) => creatImagesMurkup(data.hits)).catch(error => console.log(error));
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