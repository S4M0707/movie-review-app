import express from "express";
import Reviews from "./reviews.controller.js";

const router = express.Router();

router.route("/movie/:id").get(Reviews.getMovieReviews);
router.route("/new").post(Reviews.postMovieReview);
router.route("/:id")
    .get(Reviews.getReview)
    .put(Reviews.putReview)
    .delete(Reviews.deleteReview);

export default router;