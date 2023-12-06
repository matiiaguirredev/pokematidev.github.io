const listaPokemon = document.querySelector("#listaPokemon");
const btnHeader = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= URL.length; i++){

    fetch(URL + i)
        .then((response) => response.json())
        .then(poke => mostrarPokemon(poke))

}

function mostrarPokemon(poke){

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p> ` )
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#025</p>
        <div class="pokemon-img">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}M</p>
                <p class="stat">${poke.weight}KG</p>
            </div>
        </div>
    `;

    listaPokemon.append(div);

}

btnHeader.forEach(btn => btn.addEventListener("click", (e) => {
    const btnId = e.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++){

        fetch(URL + i)
            .then((response) => response.json())
            .then(poke => {
                
                const tipos = poke.types.map(type => type.type.name);
                if(tipos.some(tipo => tipo.includes(btnId))) {
                    mostrarPokemon(poke);
                } else if (btnId === "ver-todos") {
                    mostrarPokemon(poke);
                }
            })
        }

}));