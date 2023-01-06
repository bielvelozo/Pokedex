(function () {
 // Load post
const urlSearchParams = new URLSearchParams(window.location.search);
const pokeID = urlSearchParams.get("id");


//config
let pokePromisses = []
let pokeInfo




const $main = document.querySelector('.infosContainer')
const $btnBack = document.querySelector('.back')
const $load = document.querySelector('.load')


const URLs = [
  `https://pokeapi.co/api/v2/pokemon/${pokeID}` ,
   `https://pokeapi.co/api/v2/characteristic/${pokeID}/`,
   `https://pokeapi.co/api/v2/gender/${pokeID}/`,
   `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`
  
]



  

 


function getPokemon(cb) {
  
  const responses =  []
  URLs.map(x => responses.push(fetch(x)))
  

  for( i in responses) {
  pokePromisses.push(responses[i].then((response) => {
    if(response.status === 404) {
     return undefined
  } else {
    return response.json()
  }
}))
  }
  
 Promise.all(pokePromisses) 
  .then(data => cb(data))
  .catch((error) => {
    console.log( error);
    
  });
 
}
 




function createPage(data) {


const types = data[0].types.map(typeInfo => typeInfo.type.name)
if (types[1] === undefined){
    types[1] = ''

}


const testDescription = () => {
  if(data[1] === undefined) {
    return ''
} else {
  return data[1].descriptions[7].description
}
}

console.log(data[1].descriptions[7])


const testGender = () => {
  if(data[2] === undefined) {
    return 'Unknown'
} else {
  return data[2].name
}
}
 
const testGenus = () => {
  if(data[3].genera[7] === undefined) {
    return data[3].genera[4].genus
  }
  else {
    return data[3].genera[7].genus
  }

}
    pokeInfo = `
    <div class ='pokeInfo'>
                <h1>${data[3].name}</h1>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data[0].id}.png" alt="">

          
                <div class='description'>        
                <p>${testDescription()}</p>
                </div> 

                <div class="types typesInfo">
                  
                  <h3> type </h3>
                  <div>
                    <span class='classes card-sub-${types[0]}'>${types[0]}</span>
                    <span class='classes card-sub-${types[1]} type2'>${types[1]}</span>
                  </div>  
                </div>

                <div class ='infoContainer'>  

                <div class='infos'>
                  <ul>
                    <li>
                      <span class='atr-title'>Height:</span>
                      <span class='atr-value'>${parseFloat(data[0].height/10)} m</span>
                    </li>

                    <li>
                      <span class='atr-title'>Weight:</span>
                      <span class='atr-value'>${parseFloat(data[0].weight/10)} Kg</span>
                    </li>

                    <li>
                      <span class='atr-title'>Gender:</span>
                      <span class='atr-value'>${testGender()}</span>
                   </li>
            
                    
                  </ul>
                </div>
                <div class='infos collumn2'>
                  <ul>
                    <li>
                      <span class='atr-title'>Category:</span>
                      <span class='atr-value'>${testGenus()}</span>
                    </li>
                    
                    <li>
                      <span class='atr-title'>Abilities:</span>
                      <span class='atr-value'>${data[0].abilities[0].ability.name}</span>
                    </li>

                    <li>
                      <span class='atr-title'>Generation:</span>
                      <span class='atr-value'>${data[3].generation.name}</span>
                    </li>


                  </ul>  

                </div>    
            </div>

                
            </div> `
    

  $main.innerHTML = pokeInfo  
  $load.style.display = 'none'
  
}

function createGrafic(data) {
  

  pokeInfo += `
  <div class="graphic">
  <h3>Stats</h3>
  <div class="graphicContainer">
      <ul>
          <li>
              <div class="maxValue">
                  <div class="maxValue value" style="height:${data[0].stats[0].base_stat}px"></div>
              </div>
              <span>HP</span>
          </li>
          <li>
              <div class="maxValue">
                  <div class="maxValue value" style="height:${data[0].stats[1].base_stat}px"></div>
              </div>
              <span>Attack</span>
          </li>
          <li>
              <div class="maxValue">
                  <div class="maxValue value" style="height:${data[0].stats[2].base_stat}px"></div>
              </div>
              <span>Defense</span>
          </li>
          <li>
              <div class="maxValue">
                  <div class="maxValue value" style="height:${data[0].stats[3].base_stat}px"></div>
              </div>
              <span>Special Attack</span>
          </li>
          <li>
              <div class="maxValue">
                  <div class="maxValue value" style="height:${data[0].stats[4].base_stat}px"></div>
              </div>
              <span>Special Defense</span>
          </li>
          <li>
              <div class="maxValue">
                  <div class="maxValue value" style="height:${data[0].stats[5].base_stat}px"></div>
              </div>
              <span>Speed</span>
          </li>
      </ul>
  </div>
</div>

  `

  $main.innerHTML = pokeInfo
}

function back() {
  $btnBack.style.display = 'flex'
  $btnBack.addEventListener('click', _ => {

    window.location.href='index.html'
  })
}

function init() {
  getPokemon(data => {
    createPage(data)
    createGrafic(data)
  } )

  back()
  // getDomElements()

}

window.onload = init;
})()