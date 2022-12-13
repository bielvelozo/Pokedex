(function () {


  //consfig
  let pokeLi
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const callPokeList = (data) => {
    createPokeList(data)

  }


  //html elements
  const $pokeCards = document.querySelector('[data-js="pokeCards"')
  const $loadPoke = document.querySelector('[data-js="loadMore"')
  const $form = document.querySelector('.search_bar')
  const $input = document.querySelector('.input_search')
  const $btnBack = document.querySelector('.back')

  //values
  let maxNum = 12
  let numOfPoke = 1
  let pokePromises = []



  function createPokeList(data) {

    pokeLi = data.reduce((accumulator, data) => {
      const types = data.types.map(typeInfo => typeInfo.type.name)

      if (types[1] == undefined) {
        types[1] = ''
      }


      accumulator += `
      <li class='card card-${types[0]}' data-js="pokeLi" >
      <div class="div-img">
          <img class='card-img '
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png">
      </div>
      <div class="padCard">
          <p class="card-id"> Nº${data.id} </p>
          <h2 class='card-title' data-js="card-title"> ${data.name}</h2>
          <div class="types">
              <span class='card-sub-${types[0]}'>${types[0]}</span>
              <span class='card-sub-${types[1]}'>${types[1]}</span>
          </div>
      </div>

  </li>`
      return accumulator

    }, '')


    $pokeCards.innerHTML = pokeLi

  }



  function loadMore(cb) {
    $loadPoke.addEventListener('click', () => {

      maxNum += maxNum

      for (; numOfPoke <= maxNum; numOfPoke++) {

        pokePromises.push(fetch(getPokemonUrl(numOfPoke)).then(response => response.json())) // faz com que a cada interacao do loop adiciona um item no final do array 
      }
      Promise.all(pokePromises)

        .then((data) => {
          cb(data)
        })



    })
  }


  function search(cb) {

    $form.addEventListener('submit', (event) => {

      event.preventDefault();

      pokePromises = []
      pokePromises.push(fetch(getPokemonUrl($input.value)).then(response => response.json()))

      Promise.all(pokePromises)

        .then((data) => {
          cb(data)
        })

      $loadPoke.style.display = 'none'
      $btnBack.style.display = 'flex'



    })

  }

  function list(cb) {

    for (; numOfPoke <= maxNum; numOfPoke++) {

      pokePromises.push(fetch(getPokemonUrl(numOfPoke)).then(response => response.json())) // faz com que a cada interacao do loop adiciona um item no final do array 

      Promise.all(pokePromises)
        .then((data) => {
          cb(data)

        })

    }

  }

  function back() {
    $btnBack.addEventListener('click', () => {
      window.location.reload()
    })
  }



  //bootstrap
  function init() {

    loadMore(callPokeList)
    search(callPokeList)
    list(callPokeList)
    back()

  }

  window.onload = init;

})()