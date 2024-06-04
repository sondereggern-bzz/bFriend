const BASE_URL = "http://localhost:3000";

/* TODO: Finish this function */
const login = (email, password) => {
    fetch(`${BASE_URL}/api/authentification/login`,{
        method: "POST",
        body: {
            email: email,
            password: password
        }
    }).then(response => {
        if (response.ok) {
            return response.json(); // TODO: Handle whatever is sent back by API
        } else if (response.error) {
            console.warn("An error occurd while logging in!");
            return null;
        } else {
            return response.json(); // TODO: Handle whatever is sent back by API
        }
    }).catch(error => {
        console.warn(`An error occurd while logging in!\n\n${error}`);
        return null;
    })
};

/* TODO: Add Event Listener and handle the login */
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    
    if (login(email, password)) {
        message.style.color = "green";
        message.textContent = "Success!";
        /* TODO: Redirect */
    } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password.";
    }
});

