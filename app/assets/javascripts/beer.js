class Beer {
  constructor (obj){
    this.id = obj.id
    this.name = obj.name
    this.style = obj.style
    this.abv = obj.abv
    this.flavor_profile = obj.flavor_profile
    this.brewery = obj.brewery
    this.reviews = obj.reviews
  }


  beersHTML() {
    return(`
    <div>
    <a href id="see-beer" data-id=${this.id}>
      <h2>${this.name}</a></h2>
      <h3>${this.style} - ${this.abv}% </h3>
    </div>
    `)
    }

  showBeerHTML() {
    return(`
      <div>
      <h1>${this.name}</a> </h1>
      <h2>by ${this.brewery.name} in ${this.brewery.location}</h2>
      <h3>${this.style} - ${this.abv}%</h3>
      <h4>${this.flavor_profile}</h4>
      <a href id="see-beer-reviews" data-id=${this.id}>
      <h5>See ${this.reviews.length} Review(s) </a><br>
      <a href id="new-review" data-id=${this.id}>Write a Review</a></h5>
      </div>
      `)
    }
}

function reviewsHTML(review) {
  return(`
    <h4><li>${review.stars} - ${review.title}</h4>
    <h5>${review.content}</h5>
    </li>
    `)
}

function clearPage() {
  $("#our-new-beers").empty()
  $("#reviews").empty()
}

function getBeers(){
  fetch('http://localhost:3000/beers')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    clearPage()
    data.forEach(beer => {
      let newBeer = new Beer(beer)
      let beerHTML = newBeer.beersHTML()
      $("#our-new-beers").append(beerHTML)
    })
    addClickBeer()
  })
    $("#our-new-beers").append("done")
}

function showBeer(id) {
  clearPage()
  $.get("/beers/" + id + ".json", function(data) {
  let beer = new Beer(data)
  let beerHTML = beer.showBeerHTML()
  $("#our-new-beers").append(beerHTML)
  addClickReview()
  addClickNewReview()
  })
}

function displayBeerReviews(id) {
  $("#reviews").empty()
  $.get("/beers/" + id + "/reviews.json", function(data) {
    data.forEach(review => {
      let reviewHTML = reviewsHTML(review)
      $("#reviews").append(reviewHTML)
    })

  })
}

function createReview(){
  console.log('inside create review')
}


// Event Listeners

function addClickBeer() {
  var links = document.querySelectorAll('#see-beer')
  for (var i = 0; i < links.length ; i++)
    {
      let id = links[i].dataset.id
      links[i].addEventListener("click", function(event) {
        event.preventDefault()
        showBeer(id)
      })
    }
  }

function addClickReview() {
  var link = document.querySelectorAll('#see-beer-reviews')
  for (var i = 0; i < link.length ; i++)
    {
      let id = link[i].dataset.id
      link[i].addEventListener("click", function(event) {
        event.preventDefault()
        displayBeerReviews(id)
      })
    }
  }

function addClickNewReview() {
  var newReview = document.querySelectorAll('#new-review')
  for (var i = 0; i < newReview.length ; i++)
    {
      let id = newReview[i].dataset.id
      newReview[i].addEventListener("click", function(event) {
        event.preventDefault()
        createReview()
      })
    }
}
