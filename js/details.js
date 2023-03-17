//Recupero información de ID de la URL
const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const detailsCard = document.querySelector(".detail-card")

//Filtro los eventos con el ID y renderizo el resultado
const selectedEvent = data.events.find(e => id == e._id);
selectedEvent.estimate ? selectedEvent.estimate : selectedEvent.estimate = selectedEvent.assistance;
detailsCard.innerHTML = `
                <img src="${selectedEvent.image}" width="300" alt="People running a marathon" class="img-fluid">
                <div class="card-description">
                    <h1>${selectedEvent.name}</h1>
                    <p><small class="text-muted">${selectedEvent.date}<br><span class="event-category">${selectedEvent.category}</span></small></p>
                    <p class="card-text">
                      ${selectedEvent.description}
                    </p>
                    <p><strong>Location:</strong> ${selectedEvent.place}</p>
                    <p><strong>Capacity:</strong> ${selectedEvent.capacity}</p>
                    <p><strong>Assistance / estimated:</strong> ${selectedEvent.estimate}</p>
                    <p>Price: $${selectedEvent.price}</p>
                </div>
                `