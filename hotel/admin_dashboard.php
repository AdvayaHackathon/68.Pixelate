<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: admin_login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <style>
        body { font-family: Arial; background: #f9f9f9; padding: 50px; text-align: center; }
        a { text-decoration: none; color: white; background: #333; padding: 10px 20px; border-radius: 4px; margin: 10px; display: inline-block; }
    </style>
</head>
<body>

<h2>Welcome Admin: <?php echo $_SESSION['admin']; ?></h2>

<a href="view_bookings.php">View All Bookings</a>
<a href="admin_logout.php">Logout</a>

</body>
</html>
