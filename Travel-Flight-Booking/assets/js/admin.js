// document.addEventListener("DOMContentLoaded", () => {
//   const adminBookingsList = document.getElementById("adminBookingsList");

//   // Retrieve all bookings
//   const bookings = JSON.parse(localStorage.getItem("myBookings")) || [];

//   if (bookings.length === 0) {
//     adminBookingsList.innerHTML = "<p>No bookings have been made yet.</p>";
//   } else {
//     bookings.forEach((booking, index) => {
//       const card = document.createElement("div");
//       card.classList.add("card");

//       card.innerHTML = `
//         <div class="card-content">
//           <h3>${booking.airline}</h3>
//           <p>${booking.from} → ${booking.to}</p>
//           <p>Date: ${booking.date}</p>
//           <p>Passengers: ${booking.passengers}</p>
//           <p><strong>₹${booking.amount}</strong></p>
//           <button onclick="deleteBooking(${index})" class="btn">Delete</button>
//         </div>
//       `;
//       adminBookingsList.appendChild(card);
//     });
//   }
// });

// // Delete booking (admin power)
// function deleteBooking(index) {
//   let bookings = JSON.parse(localStorage.getItem("myBookings")) || [];
//   bookings.splice(index, 1);
//   localStorage.setItem("myBookings", JSON.stringify(bookings));
//   alert("Booking deleted by admin.");
//   window.location.reload();
// }
// -----------------------------------
document.getElementById("addFlightForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      // Gather form data
      const formData = {
        flightNumber: document.getElementById("flightNumber").value,
        departureCity: document.getElementById("from").value,       
        destinationCity: document.getElementById("to").value,       
        basePrice: parseFloat(document.getElementById("basePrice").value),
        totalSeats: parseInt(document.getElementById("totalSeats").value)
      };

      try {
        const response = await fetch("http://localhost:8181/api/v1/flights/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }

        const result = await response.json();
        console.log("Flight added:", result);

        alert(`Flight "${result.flightNumber}" added successfully!`);
        document.getElementById("addFlightForm").reset();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addFlightModal'));
        modal.hide();

      } catch (error) {
        console.error("Error:", error);
        alert("Failed to add flight: " + error.message);
      }
    });

      async function loadUserCount() {
      try {
        const response = await fetch("http://localhost:8181/api/v1/auth/count");
        const data= await response.json();
        console.log("Count data:", data);

        const total = data.totalUsers;

        document.getElementById("userCount").textContent = total;

      } catch (error) {
        console.error("Error fetching user count:", error);
        document.getElementById("userCount").textContent = "Error";
      }
    }
    loadUserCount();

    async function loadFlightCount() {
      try {
        const response = await fetch("http://localhost:8181/api/v1/flights/count");
        const data = await response.json();
        console.log("Count data:", data);

        const total = data.totalFlights;

        document.getElementById("flightCount").textContent = total;

      } catch (error) {
        console.error("Error fetching fligth count:", error);
        document.getElementById("flightCount").textContent = "Error";
      }
    }
    loadFlightCount();