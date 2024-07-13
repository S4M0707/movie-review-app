class Render {
    #main;
    #search;
    #APILINK;

    constructor() {
        this.#main = document.getElementById("main");
        this.#search = document.getElementById("srch");
        this.#APILINK = 'http://localhost:8000/api/v1/reviews/movies/';

        this.fetchMovies("avengers");
    }

    async fetchMovies(title) {
        try {
            const response = await fetch(this.#APILINK + encodeURIComponent(title));
            const data = await response.json();
            this.#renderMovies(data);
        }
        catch (e) {
            console.log(`api, ${e}`);
        }
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

        const title = document.createElement('a');
        title.setAttribute('href', `./pages/review.html?id=${element.imdbID}&title=${element.Title}`);
        title.setAttribute('class', 'title');

        title.innerText = `${element.Title}`;
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
                this.fetchMovies(searchItem);
                this.#search.value = "";
            }
        });
    }
}

(function () {
    const render = new Render();
    render.searchItem();
})();
