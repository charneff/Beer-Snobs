$(function(){
  console.log("loaded")
  listenForBeerClick()
  clickBeer()
})

function listenForBeerClick(){
  $("button#click-beer").on('click', function (event) {
    event.preventDefault()
    getBeers()
  })
}

function clickBeer(){
  $("button#show-beer").on('click', function (e) {
    e.preventDefault()
    console.log("clicked")
    showBeer(id)
  })
}

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
}

Beer.prototype.addHTML= function(){
  return(
    `<li> <strong> <a href= beers/${this.id} data-id= ${this.id} class= "show_link"> ${this.name} </a> </strong> </li>`
  )
}

Beer.prototype.beersHTML = function() {
  return(`
  <div>
  <a href="/beers/${this.id}">
    <h2>${this.name} - ${this.abv}% </h2></a>
    <h3>${this.style} by ${this.brewery.name} in ${this.brewery.location}</h3>
    <h4>${this.flavor_profile}</h4>

  </div>
  `)
  }

function getBeers(){
  $.ajax({
    url: 'http://localhost:3000/beers',
    method: 'get',
    dataType: 'json',
  }).done(function(data) {
    data.forEach(beer => {
      let allBeers = new Beer(beer)
      let allBeersHTML = allBeers.beersHTML()
      document.getElementById("our-new-beers").innerHTML += allBeersHTML
    })
  })
}

function showBeer(id){
  fetch(`/${id}`)
  .then(res => res.json())
  .then(console.log(res))
}
