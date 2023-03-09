
//Filter events with future dates & render them
let filteredEvents = data.events.filter(event => new Date(event.date) > new Date(data.currentDate));
for(let event of filteredEvents) {
    let cardHTML = createCard(event);
    eventsContainer.innerHTML += cardHTML;
}

const futureContainer = document.getElementById('futureContainer');
futureContainer.innerHTML = uniqueCategories.map(category => `
<label for="${category}" onchange="search(filteredEvents)">
  <input type="checkbox" id="${category}" name="${category}" value="${category}">
  ${category}
</label>
`).join('');