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
  <a href id="see-beer-reviews">
  <h5>See ${this.reviews.length} Review(s) </a><br>
    <a href>Write a Review</a></h5>
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
    </div>
    `)
  }
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

function clearPage() {
  $("#our-new-beers").empty()
}

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


function showBeer(id) {
  clearPage()
  $.get("/beers/" + id + ".json", function(data) {
  let beer = new Beer(data)
  let beerHTML = beer.showBeerHTML()
  $("#our-new-beers").append(beerHTML)
  })
}
