//Capture categories and discard duplicates
let eventCategories = [];
for (e of data.events) {
    eventCategories.push(e.category);
}
let uniqueCategories = [...new Set(eventCategories)]

//Render checkboxes based on unique categories
const checkboxContainer = document.getElementById('checkboxContainer');
checkboxContainer.innerHTML = uniqueCategories.map(category => `
<label for="${category}" onchange="search(data.events)">
  <input type="checkbox" id="${category}" name="${category}" value="${category}">
  ${category}
</label>
`).join('');

//Capture chosen filters to "checked" variable
let checkboxes = document.querySelectorAll('input[type=checkbox]');
let checked = [];
checkboxes.forEach((checkbox) => {
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    checked.push(checkbox.value);
  } else {
    checked = checked.filter((value) => value !== checkbox.value);
  }
  });
});

//Search bar variables
let searchResults = document.getElementById("searchbar");
let searchInput;
//Search bar event listener
searchResults.addEventListener("change", (event) => {
    searchInput = event.target.value.toLowerCase();
});

//Search function
function search(eventlist) {
    eventsContainer.innerHTML = ""
    for (e of eventlist) {
        let eventName = e['name'].toLowerCase();
        let eventDescription = e['description'].toLowerCase();
                
        if ((eventName.includes(searchInput) || eventDescription.includes(searchInput)) && checked.length == 0) {
          //IF there are search input matches & no selected checkboxes, renders corresponding events
          let cardHTML = createCard(e);
          eventsContainer.innerHTML += cardHTML;
        } else if ((eventName.includes(searchInput) || eventDescription.includes(searchInput)) && checked.includes(e.category)) {
          //IF there are search input matches & checkboxes are selected, renders corresponding events
          let cardHTML = createCard(e);
          eventsContainer.innerHTML += cardHTML;
      } else if (!searchInput && checked.includes(e.category)) {
        //IF the search input is empty & checkboxes are selected, renders corresponding events
        let cardHTML = createCard(e);
          eventsContainer.innerHTML += cardHTML;
      } 
    }
    //IF no results are available, show an error message
    if (!searchInput && checked.length == 0) {
      //IF the search input is empty & no checkboxes are selected, renders all events
      location.reload() //Perdon se q esto es re chancho pero estoy en proceso de armar una solución más decente, anda as intended!!!
    } else if (eventsContainer.childNodes.length === 0) {
      eventsContainer.innerHTML += "<div class='container failedSearch'><p>There are no events with that name. Try again!</p></div>";
    }
  }