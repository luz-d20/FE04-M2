let eventCategories = [];
for (e of data.events) {
    eventCategories.push(e.category);
}
eventCategories = [...new Set(eventCategories)];
//Render checkboxes based on the array of categories
function createCheckboxes(containerName) {
  const checkboxesContainer = document.getElementById(containerName);
  checkboxesContainer.innerHTML = eventCategories.map(category => `
    <label for="${category}">
      <input type="checkbox" id="${category}" name="${category}" value="${category}" onchange="filterCards()">
      ${category}
    </label>
  `).join('');
}
//Creates all cards from an array of objects given as parameter
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
//Filters the existing cards via checkboxes and search bar
function filterCards() {
  const checkboxes = document.querySelectorAll("#checkboxContainer input[type=checkbox]");
  const selectedCategories = [...checkboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const searchBar = document.getElementById("searchbar");
  const searchValue = searchBar.value.trim().toLowerCase();
  const cards = document.querySelectorAll("#events-container .card");
  let hasResults = false;
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
  const failedSearch = document.querySelector('.failedSearch');
  if (!hasResults) {
    failedSearch.style.display = 'block';
  } else {
    failedSearch.style.display = 'none';
  }
}
//Add event listener to search bar
const searchBar = document.getElementById("searchbar");
searchBar.addEventListener("input", filterCards);