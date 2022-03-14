(function () {

  
  //consfig
  let $pokeCards
  let $search
 
  let pokeLi
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`




  function getPokeDOM() {
    $pokeCards = document.querySelector('[data-js="pokeCards"')
    $search = document.querySelector('[data-js="search"]')
    
  }




  function getPokeData(cb) {

    const pokePromises = []

    for (let i = 1; i <= 90; i++) {

      pokePromises.push(fetch(getPokemonUrl(i)).then(response => response.json())) // faz com que a cada interacao do loop adiciona um item no final do array 

      Promise.all(pokePromises) //retorna uma promise 

        .then((data) => {
          cb(data)
        })
    }
    
  }


  function createPokeList(data) {

    pokeLi = data.reduce((accumulator, data) => {
    const types = data.types.map(typeInfo => typeInfo.type.name)

      if (types[1] == undefined) {
        types[1] = ''
      }
      

      accumulator += `
      <li class='card card-${types[0]} '>
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


  function pokeSearch(data) {
    
     
     
     $search.addEventListener("keyup", function(){

        let value = $search.value.toLowerCase()
        
        
        for (let k = 0; k < $pokeCards.childNodes.length; k++){
          let found = false
          pokeLi = $pokeCards.childNodes[k]
          
          let li = pokeLi.childNodes
          
          

          for(let j = 0; j < li.length; j++) {

            console.log(li[j].childNodes[4])
            
            // for (let i = 0; i < data.length; i++) {
            //   let name = data[i].name

            //   if(name == value && name == li[j].childNodes[3] ){
            //     found = true
            //   }

            
            
          }

         
         


        }

        

     })
      
     
      
    }
  
    
    


  //bootstrap
  function init() {

    getPokeDOM()
    getPokeData((data) => {
      createPokeList(data)
      pokeSearch(data)
    })
    

  }

  window.onload = init;

})()