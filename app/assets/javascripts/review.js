root = 'http://localhost:3000/'

$(function(){
  console.log("loaded")
  listenForClick()
})

function listenForClick(){
  $("button#click-me").on('click', function (event) {
    event.preventDefault()
    getReview()
  })
}

class Review {
  constructor (object){
    this.id = object.id
    this.stars = object.stars
    this.title = object.title
    this.content = object.content
    this.beer = object.beer
  }
}

Review.prototype.reviewHTML = function() {
  return(`
  <div>
    <h2>${this.stars} - ${this.title}</h2>
    <h3>${this.beer.name}</h3>

    <p>${this.content}</p>
  </div>
  `)
}

Review.prototype.displayBeerReviews = function() {
  let reviewsHtml = `<li><strong>${this.title}</strong> - ${this.text}</li> <br />`
  return reviewsHtml;
}

function getReview(){
  $.ajax({
    url: root + 'reviews',
    method: 'get',
    dataType: 'json',
  }).done(function(data) {
    data.forEach(review => {
      let allReview = new Review(review)
      let allReviewHTML = allReview.reviewHTML()
      document.getElementById("our-new-reviews").innerHTML += allReviewHTML
    })
  })
}
