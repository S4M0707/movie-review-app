export default class Movies {
    #APILINK;
    #SEARCHAPI;

    constructor() {
        this.#APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
        this.#SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";
    }

    async #returnMovies(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data.results;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    searchMovies(item) {
        const url = item ? this.#SEARCHAPI + item : this.#APILINK;
        return this.#returnMovies(url);
    }
}
