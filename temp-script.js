function handleLogin(event) {
    event.preventDefault(); // Stop form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    // Set your valid credentials here
    const validUsername = "cleiton";
    const validPassword = "6969";

    if (username === validUsername && password === validPassword) {
      window.location.href = './homepage.html';
    } else {
        errorDiv.style.display = 'flex';
    }
  }

  function closeError() {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none'; 
  }