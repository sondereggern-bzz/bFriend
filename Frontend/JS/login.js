const BASE_URL = "http://localhost:3000";

/* TODO: Finish this function */
const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/authentification/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            console.warn("An error occurred while logging in!");
            return null;
        }
    } catch (error) {
        console.warn(`An error occurred while logging in!\n\n${error}`);
        return null;
    }
};

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    
    const user = await login(email, password);
    
    console.log(user)
    if (user) {
        message.style.color = "green";
        message.textContent = "Success!";
        /* TODO: Redirect */
    } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password.";
    }
});
