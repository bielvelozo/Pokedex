(function () {
 // Load post
const urlSearchParams = new URLSearchParams(window.location.search);
const pokeID = urlSearchParams.get("id");


//config
let pokemon
let pokeCache = []


//DOM elements 
const $main = document.querySelector('main')
const getPokemonUrl =  `https://pokeapi.co/api/v2/pokemon/${pokeID}`
const UrlPokeCharc = `https://pokeapi.co/api/v2/characteristic/${pokeID}/`
const getGender = `https://pokeapi.co/api/v2/gender/${pokeID}/`

  

 

function getPokemon(cb) {

const  responses =  [fetch(UrlPokeCharc) , fetch(getPokemonUrl) , fetch(getGender)]

for( i in responses ){
    responses[i]
 .then(response => response.json())
 .then(data => cb(data)) 

}


}


function createPage(data) {
    
  console.log(data[1])
//    const description = () => {
//        for(i in data) {
//         return data[i].description
//        }
//        data.descriptions.map( desc => desc.description)
// } 


    

    // let pokeInfo = `
    //         <div>
    //             <h1>${data.name}</h1>
    //             <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="">
    //             <p>Description: ${description[7]}</p>
    //         </div> `
    

//   $main.innerHTML = pokeInfo  
}

getPokemon(data => createPage(data) )
})()