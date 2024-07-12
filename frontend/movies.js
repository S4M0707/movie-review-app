export default class Movies {
    #API_LINK;
    #API_KEY;

    constructor() {
        this.#API_KEY = "xyz";
        this.#API_LINK = `http://www.omdbapi.com/?i=tt3896198&apikey=${this.#API_KEY}&s=`;
    }

    async #returnMovies(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data.Search;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    searchMovies(item) {
        const url = item ? this.#API_LINK + item : this.#API_LINK + 'avengers'
        return this.#returnMovies(url);
    }
}
