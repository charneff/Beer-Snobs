// function createReview() {
//   const review = {
//     beer_id: document.getElementById('beer_id').value,
//     stars: document.getElementById('stars').value,
//     title: document.getElementById('title').value,
//     content: document.getElementById('content').value
//   }
//   fetch('http://localhost:3000/reviews', {
//     method: 'POST',
//     body: JSON.stringify( {review} ),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   }).then(resp => resp.json())
//   .then(review => {
//     document.querySelector('#reviews').innerHTML += `<h4><li>${review.stars} - ${review.title}</h4>
//     <h5>${review.content}</h5>
//     </li>`
//     let reviewForm = document.getElementById('review-form')
//     reviewForm.innerHTML=""
//   })
// }

// class Review {
//   constructor (object){
//     this.id = object.id
//     this.stars = object.stars
//     this.title = object.title
//     this.content = object.content
//     this.beer = object.beer
//   }
// }
//
// Review.prototype.reviewHTML = function() {
//
//   return(`
//   <div id="review-info">
//     <h2>${this.stars} - ${this.title}</h2>
//     <a href="/beers/${this.beer.id}" id="see-beer">
//     <h4>${this.beer.name}</h4></a>
//     <p>${this.content}</p>
//   </div>
//   `)
// }
//
// function getReviews(){
//   fetch('http://localhost:3000/reviews')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     $("#our-new-beers").empty()
//     data.forEach(review => {
//       let newreview = new Review(review)
//       let reviewHTML = newReview.reviewHTML()
//       $("#our-new-beers").append(reviewHTML)
//     })
//   })
//     $("#our-new-beers").append("done")
// }
