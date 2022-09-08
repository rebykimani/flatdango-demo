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
function displayMovie(movie) {
  const li = document.createElement("li");
  li.style.cursor = "pointer";
  li.textContent = movie.title.toUpperCase();
  listFolder.appendChild(li);
  addClickEvent();
}
function addClickEvent() {
  let children = listFolder.children;
  // console.log(children)

  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // console.log(child)

    child.addEventListener("click", () => {
      fetch(`${url}/${i + 1}`)
        .then((res) => res.json())
        .then((movie) => {
          document.getElementById("buy-ticket").textContent = "Buy Ticket";
          makeMovieDetails(movie);
        });
    });
  }
}
function makeMovieDetails(childMovie) {
  const preview = document.getElementById("poster");
  preview.src = childMovie.poster;

  const moviesTitle = document.querySelector("#title");
  moviesTitle.textContent = childMovie.title;
  const movieDuration = document.querySelector("#runtime");
  movieDuration.textContent = `${childMovie.runtime} minutes`;
  const movieDetails = document.querySelector("#film-info");
  movieDetails.textContent = childMovie.details;
  const displayTime = document.querySelector("#showtime");
  displayTime.textContent = childMovie.displayTime;
  const tickets = document.querySelector("#ticket-num");
  tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}
const btn = document.getElementById("buy-ticket");

btn.addEventListener("click", function (e) {
  let availableTickets = document.querySelector("#ticket-num").textContent;
  e.preventDefault();
  if (availableTickets > 0) {
    document.querySelector("#ticket-num").textContent = availableTickets - 1;
  } else if (parseInt(availableTickets, 10) === 0) {
    btn.textContent = "No tickets available at the moment";
  }
});
