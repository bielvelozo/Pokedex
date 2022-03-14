function getPokeData() {
    const url = `https://pokeapi.co/api/v2/pokemon/13`

    fetch(url)
    .then((Response) => {
       return Response.json()
    }) 

    .then((data) => {
       return console.log(data)
    })
    
}

getPokeData()