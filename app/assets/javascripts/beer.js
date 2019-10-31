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

function getBeersAlpha(){
  fetch('http://localhost:3000/beers')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    clearPage()
    document.getElementById('our-new-beers').innerHTML += "<h1>All Beers</h1>"
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
      document.getElementById('our-new-beers').innerHTML += beerHTML
    })
    addClickBeer()
  })
}

function showBeer(id) {
  clearPage()
  $.get("/beers/" + id, function(data) {
  let beer = new Beer(data)
  let beerHTML = beer.showBeerHTML()
  document.getElementById('our-new-beers').innerHTML += beerHTML
  addClickReview()
  addClickNewReview()
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
