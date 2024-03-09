// Importing modules
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchData } from "./js/pixabay-api.js";
import { renderMurcup } from "./js/render-functions.js";

// Initializing the lightbox and variables
const lightbox = new SimpleLightbox(".gallery-link", {
  captionsData: "alt",
  captionDelay: 250,
});

const form = document.querySelector("#searchForm");
const container = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more-btn");
let currentPage = 1;
let totalHits = 0;
let searchQuery = "";

loadMoreBtn.style.display = "none";

// Event listeners
loadMoreBtn.addEventListener("click", onLoadMore);
form.addEventListener("submit", onSubmit);
container.addEventListener("scroll", smoothScroll);

// User submits the search form
function onSubmit(event) {
  event.preventDefault();
  container.innerHTML = "";
  currentPage = 1;
  searchQuery = form.elements.searchQuery.value.trim();
  fetchImages();
}
// User clicks the load more button
  function onLoadMore() {
  currentPage++;
  fetchImages();
}

  function fetchImages() {
  fetchData(searchQuery, currentPage)
    .then(data => {
      totalHits = data.totalHits;
      const murcup = renderMurcup(data);
      container.insertAdjacentHTML('beforeend', murcup);
      lightbox.refresh();
      handleLoadMoreButton(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Show or hide the "Load more" button based on the total number of hits and the current number of children in the container
function handleLoadMoreButton(data) {
  if (container.children.length < totalHits) {
    loadMoreBtn.style.display = "block";
  } else {
    const currentHits = currentPage * 15;
    if (currentHits >= totalHits) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#4CAF50',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#4CAF50',
        position: 'topRight',
      });
    } else {
      renderMurcup(data); 
    }
  }
}
// Allows for smooth scrolling within the container
function smoothScroll() {
  const itemHeight = container.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: 3 * itemHeight,
    behavior: "smooth",
  });
}