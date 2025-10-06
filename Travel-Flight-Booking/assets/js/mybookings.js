document.addEventListener("DOMContentLoaded", () => {
  const bookingsList = document.getElementById("bookingsList");

  // Get saved bookings from localStorage
  const bookings = JSON.parse(localStorage.getItem("myBookings")) || [];

  if (bookings.length === 0) {
    bookingsList.innerHTML = "<p style='text-align: center;'>You have no bookings yet.</p>";
  } else {
    bookings.forEach((booking, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-content">
          <h3>${booking.airline}</h3>
          <p>${booking.from} → ${booking.to}</p>
          <p>Date: ${booking.date}</p>
          <p>Passengers: ${booking.passengers}</p>
          <p><strong>₹${booking.amount}</strong></p>
          <button onclick="cancelBooking(${index})" class="btn">Cancel</button>
        </div>
      `;
      bookingsList.appendChild(card);
    });
  }
});

// Cancel booking function
function cancelBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("myBookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("myBookings", JSON.stringify(bookings));
  alert("Booking cancelled.");
  window.location.reload();
}
