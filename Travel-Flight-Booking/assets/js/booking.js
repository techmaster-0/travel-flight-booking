// Flight Booking Logic (Frontend)

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const passengers = document.getElementById("passengers").value;

    if (from && to && date && passengers) {
      const searchData = { from, to, date, passengers };
      localStorage.setItem("searchData", JSON.stringify(searchData));

      window.location.href = "results.html";
    } else {
      alert("Please fill in all fields.");
    }
  });
});



if (from && to && date && passengers) {
  alert(`Searching flights from ${from} to ${to} on ${date} for ${passengers} passenger(s).`);
  window.location.href = "results.html";  // Redirect to results page
} else {
  alert("Please fill in all details.");
}
