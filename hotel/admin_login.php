<!DOCTYPE html>
<html>
<head>
    <title>Admin Login - Hotel Booking</title>
    <style>
        body { font-family: Arial; background: #f1f1f1; padding: 50px; }
        .login-container { max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 10px; }
        input { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 5px; }
        button { background-color: #333; color: white; padding: 12px; border: none; border-radius: 5px; cursor: pointer; width: 100%; }
        button:hover { background-color: #555; }
    </style>
</head>
<body>

<div class="login-container">
    <h2>Admin Login</h2>
    <form action="admin_auth.php" method="POST">
        <input type="text" name="username" placeholder="Username" required>

        <input type="password" name="password" placeholder="Password" required>

        <button type="submit">Login</button>
    </form>
</div>

</body>
</html>
