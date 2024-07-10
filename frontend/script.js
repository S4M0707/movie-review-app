import Movies from './movies.js';

class Render {
    #main;
    #search;
    #movies;

    constructor() {
        this.#main = document.getElementById("main");
        this.#search = document.getElementById("srch");
        this.#movies = new Movies();

        // Fetch and render initial movies
        this.#movies.searchMovies("").then(data => {
            this.#renderMovies(data);
        });
    }

    #renderMovie(element) {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        title.innerHTML = `${element.Title}`;
        image.src = element.Poster;

        div_card.appendChild(image);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        this.#main.appendChild(div_row);
    }

    #renderMovies(data) {
        this.#main.innerHTML = ''; // Clear existing content
        data.forEach(element => this.#renderMovie(element));
    }

    searchItem() {
        const form = document.getElementById("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const searchItem = this.#search.value.trim();

            if (searchItem) {
                this.#movies.searchMovies(searchItem).then(data => {
                    this.#renderMovies(data);
                });
                this.#search.value = "";
            }
        });
    }
}

(function () {
    const render = new Render();
    render.searchItem();
})();
