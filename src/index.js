import Notiflix from 'notiflix';
import axios from 'axios';
import refs from "./js/refs"
import createMarkup from "./js/markup"

refs.form.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onSearch)

let searchQuery = "";
let page = 1;
let searchResult = 0;

function onSearch(e) {
  e.preventDefault()
  searchQuery.trim();
  if (searchQuery !== refs.form.elements.searchQuery.value) {
    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.gallery.innerHTML = " ";
    page = 1;
  }

  if (!refs.form.elements.searchQuery.value) {
    refs.gallery.innerHTML = " ";
    refs.loadMoreBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure("Sorry, you didn't write anything");
  }
  
  searchQuery = refs.form.elements.searchQuery.value.trim();

  pixabayApi(searchQuery)
}


async function  pixabayApi(request) {
  const KEY = "30417508-2d287071902608180e72a4847";
  
  await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
  .then(function (response) {
    if (response.data.total === 0) {
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again")
    }
    if (page === 1) {
      Notiflix.Notify.success(`Hoorey! We found ${response.data.total} images`)
    }

    searchResult = response.data.totalHits;
    
    createMarkup(response);

    if (page * 40 > response.data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
    }
  })
  .catch(function (error) {
    alert(error)   
  })
  page += 1
};


// const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });