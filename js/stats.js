 //Variables de scope global
 const generalContainer = document.querySelector("#generalStats");
 const upcomingContainer = document.querySelector("#upcomingStats");
 const pastContainer = document.querySelector("#pastStats");
 //Función para poblar todas las estadísticas
 async function populateStats() {
     //Espero que llegue la info de la API
     await getEvents();
     populateGeneralStats(data);
     populateUpcomingStats(filteredFutureEvents);
     populatePastStats(filteredPastEvents);
 }
 //Poblar primera tabla
 function populateGeneralStats (data) {
     let highestAttendance = getHighestAttendance(data);
     let lowestAttendance = getLowestAttendance(data);
     let largestCapacity = getLargestCapacity(data);
     let statsHTML = `
         <tr>
             <td>${highestAttendance.name} with an attendance of ${Math.round(parseInt(highestAttendance.assistance) * 100 / parseInt(highestAttendance.capacity))}%.</td>
             <td>${lowestAttendance.name} with an attendance of ${Math.round(parseInt(lowestAttendance.assistance) * 100 / parseInt(lowestAttendance.capacity))}%.</td>
             <td>${largestCapacity.name} with a capacity of ${largestCapacity.capacity} attendees.</td>
         </tr>
     `
     generalContainer.innerHTML += statsHTML;

 }
 //Calcular evento con mayor asistencia
 function getHighestAttendance(data) {
     const events = data.events;
     return events.reduce((acumulador, valorActual) => {
         if (valorActual.assistance > acumulador.assistance) {
             return valorActual;
         } else {
             return acumulador;
         }
     });
 }   
 //Calcular evento con menor asistencia
 function getLowestAttendance(data) {
     const events = data.events;
     return events.reduce((acumulador, valorActual) => {
         if (valorActual.assistance < acumulador.assistance) {
             return valorActual;
         } else {
             return acumulador;
         }
     });
 }   
 //Calcular evento con mayor capacidad
 function getLargestCapacity(data) {
     const events = data.events;
     return events.reduce((acumulador, valorActual) => {
         if ((valorActual.capacity) > acumulador.capacity) {
             return valorActual;
         } else {
             return acumulador;
         }
     });
 }   
 //Poblar segunda tabla
 function populateUpcomingStats(data) {
     eventCategories.forEach(element => {
         let filteredEvents = data.filter(event => event.category === element);
         let categoryRevenue = getRevenueByCategory(filteredEvents);
         let categoryAttendance = getAttendanceByCategory(filteredEvents);
         let statsHTML = `
             <tr>
                 <td>${element}</td>
                 <td>${categoryRevenue}</td>
                 <td>${categoryAttendance}</td>
             </tr>
         `
         upcomingContainer.innerHTML += statsHTML;                
     });
 }
 //Calcular ingresos promedio por categoría
 function getRevenueByCategory(data) {
     let eventsAmount = data.length;
     let revenue = 0;
     data.forEach(element => {
         const estimate = parseInt(element.estimate||element.assistance);
         const price = parseInt(element.price);
         revenue += (estimate * price / eventsAmount);
     });
     if (revenue === 0) {
         return "No events scheduled"
     } else {
         return "$" + Math.round(revenue) + " average per event";
     }
 }
 //Calcular asistencia promedio por categoría
 function getAttendanceByCategory(data) {
     let eventsAmount = data.length;
     let attendance = 0;
     data.forEach(element => {
         attendance += parseInt(element.estimate||element.assistance);
     });
     if (attendance === 0) {
         return "No events scheduled"
     } else {
         return Math.round(attendance / eventsAmount) + " average per event";
     }
 }
 //Poblar tercera tabla
 function populatePastStats(data) {
     eventCategories.forEach(element => {
         let filteredEvents = data.filter(event => event.category === element);
         let categoryRevenue = getRevenueByCategory(filteredEvents);
         let categoryAttendance = getAttendanceByCategory(filteredEvents);
         let statsHTML = `
             <tr>
                 <td>${element}</td>
                 <td>${categoryRevenue}</td>
                 <td>${categoryAttendance}</td>
             </tr>
         `
         pastContainer.innerHTML += statsHTML;                
     });
 }
 document.addEventListener("DOMContentLoaded", populateStats);