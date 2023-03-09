//Variable declarations
let eventsContainer = document.querySelector(".events-container");
let htmlEvents = "";
let buttonEvent = "";
//Main create card function
function createCard(e) {
  e.estimate = e.estimate || e.assistance;
  return `<div class="card" style="width: 18rem;">
    <img src="${e.image}" class="card-img-top" alt="${e.description}">
    <div class="card-body">
        <h5 class="card-title">${e.name}</h5>
        <p><small class="text-muted">${e.date}<br><span class="event-category">${e.category}</span></small></p>
        <p class="card-text">
        ${e.description}
        </p>
        <p><strong>Location:</strong> ${e.place}</p>
        <p><strong>Capacity:</strong> ${e.capacity}</p>
        <p><strong>Assistance:</strong> ${e.estimate}</p>
        <p>Price: $${e.price}</p>
        <a href="details.html?id=${e._id}" class="btn btn-primary">Read More</a>
    </div>
    </div>`;
}
//Function to populate cards with no filtering information
function populateCards () {
for(let event of data.events){
  let cardHTML = createCard(event);
  eventsContainer.innerHTML += cardHTML;
}}

