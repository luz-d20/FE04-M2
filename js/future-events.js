async function populateIndex() {
    //Espero que llegue la info de la API
    await getEvents();
    //Renderizo todos los eventos y checkboxes con la función declarada en Main.js
    createCheckboxes("checkboxContainer");
    createCards(filteredFutureEvents);
}
handleSearchBar()
document.addEventListener("DOMContentLoaded", populateIndex);