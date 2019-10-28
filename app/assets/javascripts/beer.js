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
      <h1>${this.name} </h1>
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

function breweriesHTML(brewery) {
  return(`
    <ul>
    <a href id="see-brewery" data-id=${brewery.id}>
    <h2>${brewery.name}</a> in ${brewery.location}</h2>
    <h5>${brewery.beers.length} Beer(s) added.</h5>
    </ul>
    `)
}


function clearPage() {
  document.getElementById('greeting').innerHTML=""
  document.getElementById('our-new-beers').innerHTML=""
  document.getElementById('reviews').innerHTML=""
  document.getElementById('review-form').innerHTML=""
  document.getElementById('links').innerHTML=""
}

function getBeersAlpha(){
  fetch('http://localhost:3000/beers')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    clearPage()
    $("#our-new-beers").append("<h1>All Beers</h1>")
    alpha = data.sort(function(a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    })

    alpha.forEach(beer => {
      let newBeer = new Beer(beer)
      let beerHTML = newBeer.beersHTML()
      $("#our-new-beers").append(beerHTML)
    })
    addClickBeer()
  })
}

function getBreweries(){
  fetch('http://localhost:3000/breweries')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    clearPage()
    $("#our-new-beers").append("<h1>All Breweries</h1>")
    data.forEach(brewery => {
      let breweryHTML = breweriesHTML(brewery)
      $("#our-new-beers").append(breweryHTML)
    })
    addClickBrewery()
  })
}

function showBrewery(id) {
  clearPage()
  $.get("/breweries/" + id, function(data) {
      let breweryHTML = breweriesHTML(data)
      $("#our-new-beers").append(breweryHTML)
    })
  }


function showBeer(id) {
  clearPage()
  $.get("/beers/" + id, function(data) {
  let beer = new Beer(data)
  let beerHTML = beer.showBeerHTML()
  $("#our-new-beers").append(beerHTML)
  addClickReview()
  addClickNewReview()
  })
}

function displayBeerReviews(id) {
  document.getElementById('reviews').innerHTML=""
  $.get("/beers/" + id + "/reviews.json", function(data) {
    data.forEach(review => {
      let reviewHTML = reviewsHTML(review)
      $("#reviews").append(reviewHTML)
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
  $("#review-form").append(html)
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


// Event Listeners

function addClickBeer() {
  let links = document.querySelectorAll('#see-beer')
  for (let i = 0; i < links.length ; i++)
    {
      let id = links[i].dataset.id
      links[i].addEventListener("click", function(event) {
        event.preventDefault()
        showBeer(id)
      })
    }
  }

function addClickBrewery() {
  let links = document.querySelectorAll('#see-brewery')
  for (let i = 0; i < links.length ; i++)
    {
      let id = links[i].dataset.id
      links[i].addEventListener("click", function(event) {
        event.preventDefault()
        showBrewery(id)
      })
    }
  }

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
