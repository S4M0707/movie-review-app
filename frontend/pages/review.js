class MovieReviewApp {
  constructor() {
    this.url = new URL(location.href);
    this.movieId = this.url.searchParams.get("id");
    this.movieTitle = this.url.searchParams.get("title");

    this.APILINK = 'http://localhost:8000/api/v1/reviews/';

    this.main = document.getElementById("main");
    this.title = document.getElementById("title");

    this.dialog = document.querySelector("dialog");
    this.addReviewBtn = document.getElementById('addReview');
    this.formCancel = document.getElementById('formCancel');
    this.reviewSubmit = document.getElementById('reviewSubmit');

    this.init();
  }

  init() {
    this.title.innerText = this.movieTitle;

    this.addReviewBtn.addEventListener('click', () => this.displayForm());
    this.formCancel.addEventListener('click', () => this.hideForm());
    this.reviewSubmit.addEventListener('click', () => this.handleReviewSubmit());

    this.returnReviews();
  }

  displayForm() {
    this.dialog.showModal();
  }

  hideForm() {
    this.dialog.close();
    document.getElementById('addReviewForm').reset();
  }

  handleReviewSubmit() {
    this.saveReview('userIp', 'reviewIp');
    this.hideForm();
  }

  async returnReviews() {
    const response = await fetch(this.APILINK + "movie/" + this.movieId);
    const data = await response.json();
    console.log(data);

    data.forEach(review => {
      const divCard = this.createReviewCard(review);
      this.main.appendChild(divCard);
    });
  }

  createReviewCard(review) {
    const divCard = document.createElement('div');
    divCard.className = "row";

    const column = document.createElement('div');
    column.className = "column";

    const card = document.createElement('div');
    card.className = "card";
    card.id = review._id;

    const reviewP = document.createElement('p');
    const reviewStrong = document.createElement('strong');
    reviewStrong.textContent = "Review: ";
    reviewP.appendChild(reviewStrong);
    reviewP.appendChild(document.createTextNode(review.review));

    const userP = document.createElement('p');
    const userStrong = document.createElement('strong');
    userStrong.textContent = "User: ";
    userP.appendChild(userStrong);
    userP.appendChild(document.createTextNode(review.user));

    const actionsP = document.createElement('p');
    const editLink = document.createElement('a');
    editLink.href = "#";
    editLink.innerHTML = "✏️";
    editLink.onclick = () => this.editReview(review._id, review.review, review.user);

    const deleteLink = document.createElement('a');
    deleteLink.href = "#";
    deleteLink.innerHTML = "🗑";
    deleteLink.onclick = () => this.deleteReview(review._id);

    actionsP.appendChild(editLink);
    actionsP.appendChild(deleteLink);

    card.appendChild(reviewP);
    card.appendChild(userP);
    card.appendChild(actionsP);
    column.appendChild(card);
    divCard.appendChild(column);

    return divCard;
  }

  editReview(id, review, user) {
    const element = document.getElementById(id);

    const reviewP = document.createElement('p');
    const reviewStrong = document.createElement('strong');
    reviewStrong.textContent = "Review: ";
    reviewP.appendChild(reviewStrong);

    const reviewInput = document.createElement('input');
    reviewInput.type = 'text';
    reviewInput.id = "review" + id;
    reviewInput.value = review;
    reviewP.appendChild(reviewInput);

    const userP = document.createElement('p');
    const userStrong = document.createElement('strong');
    userStrong.textContent = "User: ";
    userP.appendChild(userStrong);

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = "user" + id;
    userInput.value = user;
    userP.appendChild(userInput);

    const actionsP = document.createElement('p');
    const saveLink = document.createElement('a');
    saveLink.href = "#";
    saveLink.innerHTML = "💾";
    saveLink.onclick = () => this.saveReview(reviewInput.id, userInput.id, id);

    actionsP.appendChild(saveLink);

    element.innerHTML = '';
    element.appendChild(reviewP);
    element.appendChild(userP);
    element.appendChild(actionsP);
  }

  async saveReview(reviewInputId, userInputId, id = "") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    const payload = JSON.stringify({ "user": user, "review": review, "movieId": this.movieId });

    const response = id ? 
      await fetch(this.APILINK + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: payload
      }) : 
      await fetch(this.APILINK + "new", {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: payload
      });

    const res = await response.json();
    console.log(res);
    location.reload();
  }

  async deleteReview(id) {
    const response = await fetch(this.APILINK + id, {
      method: 'DELETE'
    });

    const res = await response.json();
    console.log(res);
    location.reload();
  }
}

const app = new MovieReviewApp();
