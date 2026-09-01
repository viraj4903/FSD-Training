const form = document.getElementById("bookingForm");
const ticket = document.getElementById("ticket");

form.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const aadhaar = document.getElementById("aadhaar").value.trim();
    const city = document.getElementById("city").value;
    const date = document.getElementById("date").value;
    const seat = document.getElementById("seat").value;

    // Get selected bus
    const selectedBus = document.querySelector(
        'input[name="bus"]:checked'
    );

    // Check if any required field is empty
    if (
        name === "" ||
        age === "" ||
        aadhaar === "" ||
        city === "" ||
        date === "" ||
        seat === "" ||
        selectedBus === null
    ) {
        alert("Please fill all the required fields before booking.");
        return;
    }

    // Check Aadhaar number
    if (!/^\d{12}$/.test(aadhaar)) {
        alert("Please enter a valid 12-digit Aadhaar number.");
        return;
    }

    // Check age
    if (Number(age) <= 0 || Number(age) > 120) {
        alert("Please enter a valid age.");
        return;
    }

    // Get bus type
    const busType = selectedBus.value;

    // Set fare according to bus type
    let fare;

    if (busType === "AC") {
        fare = 2000;
    } else {
        fare = 1500;
    }

    // Convert date into a more readable format
    const bookingDate = new Date(date + "T00:00:00");

    const formattedDate = bookingDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    // Display booking details
    ticket.innerHTML = `
        <div class="success-ticket">

            <h3>Ticket Booked Successfully</h3>

            <p>
                <strong>Passenger:</strong> ${name}
            </p>

            <p>
                <strong>Age:</strong> ${age}
            </p>

            <p>
                <strong>Aadhaar Number:</strong> ${aadhaar}
            </p>

            <p>
                <strong>City:</strong> ${city}
            </p>

            <p>
                <strong>Travel Date:</strong> ${formattedDate}
            </p>

            <p>
                <strong>Bus Type:</strong> ${busType} Bus
            </p>

            <p>
                <strong>Seat Number:</strong> ${seat}
            </p>

            <p>
                <strong>Fare:</strong> ₹${fare}
            </p>

        </div>
    `;

    // Scroll to the generated ticket
    ticket.scrollIntoView({
        behavior: "smooth"
    });
});