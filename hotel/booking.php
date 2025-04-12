<!DOCTYPE html>
<html>
<head>
    <title>Hotel Booking Page</title>
    <style>
        body { font-family: Arial; background: #f1f1f1; padding: 50px; }
        .form-container { max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; }
        input, select { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 5px; }
        button { background-color: #4CAF50; color: white; padding: 12px; border: none; border-radius: 5px; cursor: pointer; width: 100%; }
        button:hover { background-color: #45a049; }
    </style>
</head>
<body>

<div class="form-container">
    <h2>Hotel Room Booking</h2>
    <form action="save_booking.php" method="POST">
        <input type="text" name="name" placeholder="Your Name" required>

        <input type="email" name="email" placeholder="Your Email" required>

        <input type="text" name="phone" placeholder="Phone Number" required>

        <label>Check-In Date</label>
        <input type="date" name="checkin_date" required>

        <label>Check-Out Date</label>
        <input type="date" name="checkout_date" required>

        <label>No. of Rooms</label>
        <input type="number" name="rooms" min="1" required>

        <button type="submit">Book Now</button>
    </form>
</div>

</body>
</html>
