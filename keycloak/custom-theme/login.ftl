<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Custom Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="login-container">
        <h1>Custom Login Page</h1>
        <form id="kc-form-login" action="${url.loginAction}" method="post">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" value="${username}" />
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>