let searchResults = document.getElementById("searchbar");
        let searchInput;

        searchResults.addEventListener("change", (event) => {
            searchInput = event.target.value.toLowerCase();
            console.log(searchInput);
        });

        function search() {
            eventsContainer.innerHTML = ""
            for (event of data.events) {
                let eventName = event['name'].toLowerCase();
                if (eventName.includes(searchInput)) {
                    console.log(eventName);
                    event.estimate ? event.estimate : event.estimate = event.assistance;
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
                            <p><strong>Assistance:</strong> ${event.estimate}</p>
                            <p>Price: $${event.price}</p>
                            <a href="#" class="btn btn-primary">Read More</a>
                        </div>
                        </div>`;
                }}
                console.log(eventsContainer);
                if (eventsContainer.childNodes.length == 0) {
                    eventsContainer.innerHTML += "<div class='container failedSearch'><p>There are no events with that name. Try again!</p></div>";
                } else if (!searchInput) {
                    populateCards()
                }
            }