//Filter events with past dates & render them
let filteredEvents = data.events.filter(event => new Date(event.date) < new Date(data.currentDate));
for(let event of filteredEvents) {
    let cardHTML = createCard(event);
    eventsContainer.innerHTML += cardHTML;
}