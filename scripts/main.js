(function () {


  //consfig
  const pokePromisses = []
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
  let pokeCache = []



  //html elements
  const $pokeCards = document.querySelector('[data-js="pokeCards"')
  const $loadPoke = document.querySelector('[data-js="loadMore"')
  const $form = document.querySelector('.search_bar')
  const $input = document.querySelector('.input_search')
  const $btnBack = document.querySelector('.back')
  const $notFound = document.querySelector('.notFound')

  //values

  function list(cb) {
    for (let i = 1; i < 906; i++) {
      pokePromisses.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokePromisses)
      .then((data) => {
        cb(data)

      })

  }

  function loadPokemons(data) {
    for (let i = 0; i < 12; i++) {
      pokeCache.push(data[i])

    }

  }


  function createPokeLi() {


    let pokeLi = pokeCache.reduce((accumulator, pokeCache) => {
      const types = pokeCache.types.map(typeInfo => typeInfo.type.name)

      if (types[1] === undefined) types[1] = ''

      accumulator += `
    <li class='card card-${types[0]}' data-js="pokeLi" >
    <a href="poke.html?id=${pokeCache.id}">
    <div class="div-img">
        <img class='card-img '
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeCache.id}.png">
    </div>
    <div class="padCard">
        <p class="card-id"> Nº${pokeCache.id} </p>
        <h2 class='card-title' data-js="card-title"> ${pokeCache.name}</h2>
        <div class="types">
            <span class='classes card-sub-${types[0]}'>${types[0]}</span>
            <span class='classes card-sub-${types[1]}'>${types[1]}</span>
        </div>
    </div>
    </a>
</li>`

      return accumulator

    }, '')

    $pokeCards.innerHTML = pokeLi


  }

  function loadMore(data) {
    $loadPoke.addEventListener('click', () => {
      let i = pokeCache.length
      let more = pokeCache.length + 12

      for (; i < more; i++) pokeCache.push(data[i])

      if (more == 24) more = pokeCache.length * 2 - 12

      createPokeLi()
    })

  }

  function search(data) {


    const byName = pokes => pokes.name.toLowerCase().indexOf($input.value.toLowerCase()) > -1
    const byID = pokes => pokes.id.toString().indexOf($input.value) > -1

    const numbers = [2, 5]

    $form.addEventListener('submit', (event) => {

      event.preventDefault()

      const namesList = data.filter(byName)
      const idsList = data.filter(byID)

      pokeCache = []
      
      if (numbers.indexOf(parseInt($input.value)) > -1) {
        for (let i = 0; i < idsList.length; i++) pokeCache.push(idsList[i])

      }
      else {
        for (let i = 0; i < idsList.length; i++) pokeCache.push(idsList[i])
        for (let i = 0; i < namesList.length; i++) pokeCache.push(namesList[i])
      }

      //alert
      if (pokeCache.length === 0 ) {
        $notFound.style.display ='flex'
      }
      else {
        $notFound.style.display = 'none'
      }

      console.log(pokeCache.length)
      createPokeLi()
      

      $loadPoke.style.display = 'none'
      $btnBack.style.display = 'flex'

    })


  }


  function back() {
    $btnBack.addEventListener('click', _ => {

      window.location.reload()
    })
  }



  //bootstrap
  function init() {
    list((data) => {
      loadPokemons(data)
      loadMore(data)
      search(data)
      createPokeLi()

    })

    back()

  }

  window.onload = init;

})()