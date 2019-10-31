class Review {
  constructor(obj){
    this.id = obj.id
    this.stars = obj.stars
    this.title = obj.title
    this.content = obj.content
    this.user_id = obj.user_id
    this.beer_id = obj.beer_id
  }
}

function reviewsHTML(review) {
  return(`
    <h4><li>${review.stars} - ${review.title} by ${review.user.username}</h4>
    <h5>${review.beer.name} - ${review.content}</h5>
    </li>
    `)
}

function getReviews(){
  fetch('http://localhost:3000/reviews')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    clearPage()
    document.getElementById('our-new-beers').innerHTML += "<h1>All Reviews</h1>"
    data.forEach(review => {
      let reviewHTML = reviewsHTML(review)
      document.getElementById('our-new-beers').innerHTML += reviewHTML
    })
  })
}

function displayBeerReviews(id) {
  document.getElementById('reviews').innerHTML=""
  $.get("/beers/" + id + "/reviews.json", function(data) {
    data.forEach(review => {
      let reviewHTML = reviewsHTML(review)
      document.getElementById('reviews').innerHTML += reviewHTML
    })

  })
}

function createReviewForm(id){
  let html = `
  <form onsubmit="createReview(); return false;">
    <div>
      <label for="beer_id" type="hidden" id="beer_id" name="beer_id" value="id"></label>
    </div>
    <div>
      <label for="stars">Stars</label>
      <input min="1" max="5" type="number" name="stars" id="stars">
    </div>
    <div>
      <label for="title">Title</label>
      <input type="text" name="title" id="title">
    </div>
    <div>
      <label for="content">Content</label>
      <textarea name="content" id="content"></textarea>
    </div>

    <input type="submit" id="submit" value="Create Review">
    </form>
  `
  document.getElementById('review-form').innerHTML += html
  document.getElementById('beer_id').value = id
}

function createReview() {
  const review = {
    beer_id: document.getElementById('beer_id').value,
    stars: document.getElementById('stars').value,
    title: document.getElementById('title').value,
    content: document.getElementById('content').value
  }
  fetch('http://localhost:3000/reviews', {
    method: 'POST',
    body: JSON.stringify( {review} ),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  .then(review => {
    document.querySelector('#reviews').innerHTML += `<h4><li>${review.stars} - ${review.title}</h4>
    <h5>${review.content}</h5>
    </li>`
    let reviewForm = document.getElementById('review-form')
    reviewForm.innerHTML=""
  })
}

//Event Listeners

function addClickReview() {
  let link = document.querySelectorAll('#see-beer-reviews')
  for (let i = 0; i < link.length ; i++)
    {
      let id = link[i].dataset.id
      link[i].addEventListener("click", function(event) {
        event.preventDefault()
        displayBeerReviews(id)
      })
    }
  }

function addClickNewReview() {
  let newReview = document.querySelectorAll('#new-review')
  for (let i = 0; i < newReview.length ; i++)
    {
      let id = newReview[i].dataset.id
      newReview[i].addEventListener("click", function(event) {
        event.preventDefault()
        createReviewForm(id)
      })
    }
}
