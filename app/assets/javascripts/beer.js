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
var breweries = []
var breweryValues = fetch('http://localhost:3000/breweries')
.then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log("inside fetch")
  console.log(data)
  data.forEach(brewery => breweries.push({
    name: brewery.name,
    id: brewery.id,
    location: brewery.location
  }))
console.log(breweries)
})

function createBeerForm(){
  clearPage()
  let html = `
  <h1>Create New Beer</h1>
  <form onsubmit="createBeer(); return false;">
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" id="name">
    </div>
    <div>
      <label for="style">Style</label>
      <input type="text" name="style" id="style">
    </div>
    <div>
      <label for="abv">Abv</label>
      <input type="number" name="abv" id="abv">
    </div>
    <div>
      <label for="flavor_profile">Flavor Profile:</label>
      <textarea name="flavor_profile" id="flavor_profile"></textarea>
    </div><br>
    <div>
    <label for="brewery">Select a Brewery</label>
    <select id="brewery" name="brewery">Populate Breweries</select>
    </div><br>
    <div>Or Create a New One:</div>
    <div>
    <label for="brewery_name">Name</label>
    <input type="text" name=brewery_name id=brewery_name>
    </div>
    <div>
    <label for="brewery_name">Location</label>
    <input type="text" name=brewery_location id=brewery_location>
    </div>

    <input type="submit" id="submit" value="Create Beer">
    </form>
  `

  document.getElementById('beer-form').innerHTML += html
  let blank = document.createElement("option")
  blank.text = "Select One"
  document.getElementById('brewery').appendChild(blank)
  breweries.forEach(brewery => {
    let d= document.createElement("option")
    d.text = `${brewery.name} - ${brewery.location}`
    d.dataset.id = brewery.id
    document.getElementById('brewery').appendChild(d)
 })


  //document.getElementById('beer_id').value = id
}

function createBeer(){

  console.log("inside create beer")
  let x = document.getElementById('brewery')
  let i = x.selectedIndex
  debugger
    const beer = {
      name: document.getElementById('name').value,
      style: document.getElementById('style').value,
      abv: document.getElementById('abv').value,
      flavor_profile: document.getElementById('flavor_profile').value,
      brewery_id: x.options[i].dataset.id
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
  fetch(`http://localhost:3000/beers/${id}`)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
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
