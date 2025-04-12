<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Guide Chat</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="chat-container">
    <div class="header">Guide Chat with User</div>

    <div class="chat-box" id="chat-box"></div>

    <form id="message-form">
        <input type="hidden" id="sender" value="guide">
        <input type="hidden" id="receiver" value="user">
        <input type="text" id="message" placeholder="Type your message..." required>
        <button type="submit">Send</button>
    </form>

</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
setInterval(function(){
    $('#chat-box').load('fetch.php?sender=guide&receiver=user');
}, 1000);

$('#message-form').submit(function(e){
    e.preventDefault();
    $.post('send.php', {
        sender: $('#sender').val(),
        receiver: $('#receiver').val(),
        message: $('#message').val()
    }, function(){
        $('#message').val('');
    });
});
</script>

</body>
</html>
