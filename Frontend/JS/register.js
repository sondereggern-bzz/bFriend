const BASE_URL = "http://localhost:3000";

const login = (email, password) => {
    fetch(`${BASE_URL}/api/authentification/register`,{
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
