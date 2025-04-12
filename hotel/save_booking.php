<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel_booking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$checkin_date = $_POST['checkin_date'];
$checkout_date = $_POST['checkout_date'];
$rooms = $_POST['rooms'];

$sql = "INSERT INTO bookings (name, email, phone, checkin_date, checkout_date, rooms)
VALUES ('$name', '$email', '$phone', '$checkin_date', '$checkout_date', $rooms)";

if ($conn->query($sql) === TRUE) {
   echo "<h2>Booking Successful!</h2><a href='booking.php'>Book Another</a>";
} else {
   echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
