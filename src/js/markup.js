import refs from "./refs"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export default function createMarkup (response) {
    const markup = response.data.hits
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `
        <div class="photo-card">
            <a class="card-link" href="${largeImageURL}">
            <div class="thumb">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img"/>
            </div>
            </a>
            <div class="info">
            <p class="info-item"><b>Likes: </b>${likes}</p>
            <p class="info-item"><b>Views: </b>${views}</p>
            <p class="info-item"><b>Comments: </b>${comments}</p>
            <p class="info-item"><b>Downloads: </b>${downloads}</p>
            </div>
        </div>`;
    })
    .join("");

    refs.gallery.insertAdjacentHTML('beforeend', markup);

    const lightbox = new SimpleLightbox(".gallery a");
}