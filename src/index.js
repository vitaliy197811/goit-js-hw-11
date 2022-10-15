import Notiflix from 'notiflix';
import refs from "./js/refs"
import pixabayApi from "./js/pixabay"

refs.form.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onSearch)

let searchQuery = "";
let page = 0;

function onSearch(e) {
  e.preventDefault()
  if (searchQuery !== refs.form.elements.searchQuery.value) {
    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.gallery.innerHTML = " ";
    page = 1
  }
  searchQuery = refs.form.elements.searchQuery.value.trim();
  if (!searchQuery) {
    refs.gallery.innerHTML = " ";
    refs.loadMoreBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure("Sorry, you didn't write anything");
  }
  pixabayApi(searchQuery, page)
  page += 1
}