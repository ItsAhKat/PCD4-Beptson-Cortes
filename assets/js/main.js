
// Acceso a 2 paginas de Swapi
const API_URL = "https://swapi.dev/api/people/?page=1";
const API2_URL = "https://swapi.dev/api/people/?page=2";

const getCharactersFromApi = async (url) => {
    try {
        const respuesta = await fetch(API_URL && API2_URL, { 
            method: "GET"
   
        });
       //console log puesto para que me llegue una confirmacion de que el fetch esta extrayendo la info de las 2 apis (2 paginas), ambos me generan un "STATUS 200 :D"
        console.log(respuesta)

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        
        const respuestaJSON = await respuesta.json();
        return respuestaJSON.results;
       
        

    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
    
     
};

const renderCharacters = async () => {
    const personajesPagina1 = await getCharactersFromApi(API_URL);
    const personajesPagina2 = await getCharactersFromApi(API2_URL);

    //lineas 38-50 generadas por IA, por falta de conocimiento ;/ 

    // Obtener los 10 primeros personajes de la primera API
    const primerosDiezPersonajes = personajesPagina1.slice(0, 10);

    // Obtener los 5 primeros personajes de la segunda API
    const primerosCincoPersonajesPagina2 = personajesPagina2.slice(0, 5);

    // Combinar los resultados
    const personajesCombinados = [...primerosDiezPersonajes, ...primerosCincoPersonajesPagina2];

    let htmlArray = [];
    for (let i = 0; i < personajesCombinados.length; i += 5) {
        const rangeStart = i + 1;
        const rangeEnd = Math.min(i + 5, personajesCombinados.length);

        htmlArray.push(`
            <div class="range-container" style="margin-bottom: 20px;">
                <div class="range-label" style="font-size: 1.5em; font-weight: bold; margin-top: 10px;">
                    Personajes ${rangeStart}-${rangeEnd}
                </div>
                <button onclick="toggleCharacters(${rangeStart}, ${rangeEnd})" style="margin-bottom: 10px;">
                    Mostrar Personajes ${rangeStart}-${rangeEnd}
                </button>
                <div id="characters-${rangeStart}-${rangeEnd}" style="display: none;">
        `);

        for (let j = i; j < rangeEnd; j++) {
            const personaje = personajesCombinados[j];
            htmlArray.push(`<div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${personaje.name}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                   Peso total: ${personaje.mass} Kg
                   <p>
                   Altura: ${personaje.height} Cm
                   </p>
                  </h6>
                </div>
              </div>
            </div>`);
        }

        htmlArray.push(`</div></div>`);
    }

    const html = htmlArray.join("");
    const personajesSection = document.getElementById("personajes");

    if (personajesSection) {
        personajesSection.innerHTML = html;
    } else {
        console.error("Element with id 'personajes' not found.");
    }
};

const toggleCharacters = (start, end) => {
    const charactersDiv = document.getElementById(`characters-${start}-${end}`);
    if (charactersDiv) {
        charactersDiv.style.display = charactersDiv.style.display === 'none' ? 'block' : 'none';
    }
};

renderCharacters();
