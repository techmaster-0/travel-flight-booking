const selectedBooking = JSON.parse(localStorage.getItem("selectedBooking"));
if (selectedBooking) {
  document.getElementById("amount").value = `₹${selectedBooking.price}`;
}

// On payment success, save booking under logged-in user
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser && selectedBooking) {
  const booking = {
    userEmail: loggedInUser.email,
    airline: selectedBooking.airline,
    from: selectedBooking.from,
    to: selectedBooking.to,
    date: selectedBooking.date,
    time: selectedBooking.time,
    passengers: selectedBooking.passengers,
    amount: selectedBooking.price
  };

  let allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
  allBookings.push(booking);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));

  alert("✅ Payment Successful! Your flight booking is confirmed.");
  window.location.href = "mybookings.html";
}
