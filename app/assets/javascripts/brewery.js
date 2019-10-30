function breweriesHTML(brewery) {
  return(`
    <ul>
    <a href id="see-brewery" data-id=${brewery.id}>
    <h2>${brewery.name}</a> in ${brewery.location}</h2>
    <h5>${brewery.beers.length} Beer(s) added.</h5>
    </ul>
    `)
}

function breweryBeersHTML(brewery) {
  return(`
    <h2><a href id="see-beer" data-id=${brewery.id}>
    ${brewery.name}</a></h2>

    `)
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
    $("#our-new-beers").append(data.name)
    data.beers.forEach(beer => {
      let breweryBeers = breweryBeersHTML(beer)
      $("#our-new-beers").append(breweryBeers)
    })
    addClickBeer()
  })
}

// Event Listener

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
