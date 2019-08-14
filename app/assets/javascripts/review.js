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
