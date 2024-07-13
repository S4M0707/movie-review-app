import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.API_KEY;
const API_LINK = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=`;

export default class Movies {
    static async searchMovies(req, res, next) {
        try {
            let title = req.params.title ? req.params.title : 'avengers';
            const url = API_LINK + encodeURIComponent(title);
            let response = await fetch(url);
            if (!response.ok) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            let movies = await response.json();
            res.json(movies.Search);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
