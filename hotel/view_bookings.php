<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: admin_login.php");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel_booking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM bookings";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>View Bookings - Admin Dashboard</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #333; color: white; }
        body { font-family: Arial; background: #f9f9f9; padding: 20px; }
        h2 { text-align: center; }
        a { text-decoration: none; color: #fff; background: #333; padding: 8px 16px; border-radius: 4px; }
    </style>
</head>
<body>

<h2>All Hotel Bookings</h2>

<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Check-in</th>
        <th>Check-out</th>
        <th>Rooms</th>
    </tr>

    <?php
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                <td>".$row['id']."</td>
                <td>".$row['name']."</td>
                <td>".$row['email']."</td>
                <td>".$row['phone']."</td>
                <td>".$row['checkin_date']."</td>
                <td>".$row['checkout_date']."</td>
                <td>".$row['rooms']."</td>
            </tr>";
        }   
    } else {
        echo "<tr><td colspan='7'>No Bookings Found</td></tr>";
    }
    ?>
</table>

<br>
<center><a href="admin_dashboard.php">Back to Dashboard</a></center>

</body>
</html>

<?php $conn->close(); ?>
