const BASE_URL = "http://localhost:3000";

/* TODO: Finish this function */
const login = async (email, password) => {
    await fetch(`${BASE_URL}/api/authentification/login`,{
        method: "POST",
        body: {
            email: email,
            password: password
        }
    }).then(response => {
        
    }).catch(error => {
        console.warn(`An error occurd while logging in!\n\n${error}`);
    })
};

/* TODO: Add Event Listener and handle the login */
