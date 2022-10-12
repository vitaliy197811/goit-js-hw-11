import axios from 'axios';
import refs from "./refs"
import Notiflix from 'notiflix';
import createMarkup from "./markup"

export default async function  pixabayApi(searchQuery, page) {
    const KEY = "30417508-2d287071902608180e72a4847";
    
    await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    .then(function (response) {
    if (response.data.total === 0) {
        refs.gallery.innerHTML = " ";
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again")
    }
    if (page === 1) {
        Notiflix.Notify.success(`Hoorey! We found ${response.data.total} images`)
    }
    
    createMarkup(response);

    if (page * 40 > response.data.totalHits) {
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
    }
    })
    .catch(function (error) {
        alert(error)   
    })
};