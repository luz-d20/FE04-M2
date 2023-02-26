let eventsContainer = document.querySelector(".events-container");
let htmlEvents = "";
for(let event of data.events){
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate < currentDate) {
        eventsContainer.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${event.image}" class="card-img-top" alt="${event.description}">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p><small class="text-muted">${event.date}<br><span class="event-category">${event.category}</span></small></p>
            <p class="card-text">
            ${event.description}
            </p>
            <p><strong>Location:</strong> ${event.place}</p>
            <p><strong>Capacity:</strong> ${event.capacity}</p>
            <p><strong>Assistance:</strong> ${event.assistance}</p>
            <p>Price: ${event.price}</p>
            <a href="#" class="btn btn-primary">Read More</a>
        </div>
        </div>`;
    } 
}


