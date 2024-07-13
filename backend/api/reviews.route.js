import express from "express";
import Reviews from "./reviews.controller.js";
import Movies from "./movies.controller.js";

const router = express.Router();

router.route("/movies/:title").get(Movies.searchMovies);
router.route("/movie/:id").get(Reviews.getMovieReviews);
router.route("/new").post(Reviews.postMovieReview);
router.route("/:id")
    .get(Reviews.getReview)
    .put(Reviews.putReview)
    .delete(Reviews.deleteReview);

export default router;