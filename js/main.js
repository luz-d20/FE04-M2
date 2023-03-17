//Array de categorías individuales
let eventCategories = [];
for (e of data.events) {
    eventCategories.push(e.category);
}
eventCategories = [...new Set(eventCategories)];
//Renderizo las checkboxes en base al array de categorías
function createCheckboxes(containerName) {
  const checkboxesContainer = document.getElementById(containerName);
  checkboxesContainer.innerHTML = eventCategories.map(category => `
    <label for="${category}">
      <input type="checkbox" id="${category}" name="${category}" value="${category}" onchange="filterCards()">
      ${category}
    </label>
  `).join('');
}
//Creo las cards en base al array de eventos dado como parámetro
function createCards(cards) {
  const cardsContainer = document.getElementById("events-container");
  cardsContainer.innerHTML = cards.map(card => `<div class="card" data-category="${card.category}" style="width: 18rem;">
    <img src="${card.image}" class="card-img-top" alt="${card.description}">
        <h5 class="card-title">${card.name}</h5>
        <p><small class="text-muted">${card.date}<br><span class="event-category">${card.category}</span></small></p>
        <p class="card-text">
        ${card.description}
        </p>
        <p><strong>Location:</strong> ${card.place}</p>
        <p><strong>Capacity:</strong> ${card.capacity}</p>
        <p><strong>Assistance:</strong> ${card.estimate || card.assistance}</p>
        <p>Price: $${card.price}</p>
        <a href="details.html?id=${card._id}" class="btn btn-dark">Read More</a>
    </div>`
    ).join('');
}
//Filtro las cards existentes por checkboxes y search bar
function filterCards() {
  //Defino lista de todas los checkbox y recupero los seleccionados: si está checkeado, recupero el value
  const checkboxes = document.querySelectorAll("#checkboxContainer input[type=checkbox]");
  const selectedCategories = [...checkboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  //Defino elemento search bar y recupero valor - saco espacios, pongo en minúscula
  const searchBar = document.getElementById("searchbar");
  const searchValue = searchBar.value.trim().toLowerCase();
  //Genero array de las cards que ya existen y variable en caso de falta de resultados de búsqueda
  const cards = document.querySelectorAll("#events-container .card");
  let hasResults = false;
  //Recorro array de cards y filtro por categorías y valor de búsqueda
  [...cards].forEach(card => {
    const cardCategory = card.getAttribute("data-category").toLowerCase();
    const cardTitle = card.querySelector("h5").textContent.toLowerCase();
    const cardDescription = card.querySelector(".card-text").textContent.toLowerCase();
    if ((selectedCategories.length === 0 || selectedCategories.includes(card.getAttribute("data-category"))) &&
        (searchValue === "" || cardCategory.includes(searchValue) || cardTitle.includes(searchValue) || cardDescription.includes(searchValue))) {
      card.style.display = "block";
      hasResults = true;
    } else {
      card.style.display = "none";
    }
  });
  //Muestro mensaje de falta de resultados
  const failedSearch = document.querySelector('.failedSearch');
  if (!hasResults) {
    failedSearch.style.display = 'block';
  } else {
    failedSearch.style.display = 'none';
  }
}
//Agrego event listener a la barra de búsqueda
const searchBar = document.getElementById("searchbar");
searchBar.addEventListener("input", filterCards);