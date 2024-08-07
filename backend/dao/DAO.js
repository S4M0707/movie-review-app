import mongodb from "mongodb"

export default class ReviewsDAO {
    static reviews;
    static async injectDB(conn) {
        if (this.reviews) {
            return
        }
        try {
            this.reviews = await conn.db("Movie").collection("Reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }
            console.log("adding")
            return await this.reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async getReview(reviewId) {
        try {
            return await this.reviews.findOne({ _id: mongodb.ObjectId(reviewId) })
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await this.reviews.updateOne(
                { _id: mongodb.ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId) {

        try {
            const deleteResponse = await this.reviews.deleteOne({
                _id: mongodb.ObjectId(reviewId),
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await this.reviews.find({ movieId: movieId })
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }

}