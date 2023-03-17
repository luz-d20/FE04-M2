//Filter events with future dates & render them
let filteredEvents = data.events.filter(event => new Date(event.date) > new Date(data.currentDate));
createCheckboxes("checkboxContainer");
createCards(filteredEvents);