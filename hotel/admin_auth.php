<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel_booking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

$user = $_POST['username'];
$pass = $_POST['password'];

$sql = "SELECT * FROM admin WHERE username='$user' AND password='$pass'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $_SESSION['admin'] = $user;
    header("Location: admin_dashboard.php");
} else {
    echo "<h3>Invalid Credentials</h3><a href='admin_login.php'>Try Again</a>";
}

$conn->close();
?>
