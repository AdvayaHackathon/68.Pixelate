<?php
include 'db.php';

$sender = $_GET['sender'];
$receiver = $_GET['receiver'];

$result = $conn->query("SELECT * FROM messages WHERE 
(sender='$sender' AND receiver='$receiver') 
OR (sender='$receiver' AND receiver='$sender') 
ORDER BY id ASC");

while($row = $result->fetch_assoc()){
    echo "<div class='message'><b>".$row['sender']."</b>: ".$row['message']."</div>";
}
?>
