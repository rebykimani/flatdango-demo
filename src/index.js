// Your code here
let url = "http://localhost:3000/films";
const listFolder = document.getElementById("films");
document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByClassName("film item")[0].remove();
  fetchMovies(url);
});

// fetch function
function fetchMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((movies) => {
      movies.forEach((movie) => {
        displayMovie(movie);
      });
    });
}
