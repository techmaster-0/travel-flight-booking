document.addEventListener("DOMContentLoaded", () => {
  const flightsList = document.getElementById("flightsList");
  const searchData = JSON.parse(localStorage.getItem("searchData"));

  if (!searchData) {
    flightsList.innerHTML = "<p>No search data found. Please go back and search flights.</p>";
    return;
  }

  const { from, to, date, passengers } = searchData;

  // Example flights database (can be extended)
  const availableFlights = [
    { airline: "Air India", time: "10:30 AM", price: 5499 },
    { airline: "IndiGo Airlines", time: "1:45 PM", price: 4999 },
    { airline: "Vistara", time: "6:15 PM", price: 6299 },
  ];

  availableFlights.forEach(flight => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-content">
        <h3>${flight.airline}</h3>
        <p>${from} → ${to}</p>
        <p>Date: ${date}</p>
        <p>Departure: ${flight.time}</p>
        <p>Passengers: ${passengers}</p>
        <p><strong>₹${flight.price}</strong></p>
        <button class="btn" onclick="bookFlight('${flight.airline}', '${from}', '${to}', '${date}', '${flight.time}', ${passengers}, ${flight.price})">Book Now</button>
      </div>
    `;
    flightsList.appendChild(card);
  });
});

// Save booking data to localStorage and redirect to payment
function bookFlight(airline, from, to, date, time, passengers, price) {
  const bookingData = { airline, from, to, date, time, passengers, price };
  localStorage.setItem("selectedBooking", JSON.stringify(bookingData));
  window.location.href = "payment.html";
}
