//Renderizo checkboxes + Filtro eventos con fechas futuras y los renderizo con la función declarada en Main.js
let filteredEvents = data.events.filter(event => new Date(event.date) > new Date(data.currentDate));
createCheckboxes("checkboxContainer");
createCards(filteredEvents);