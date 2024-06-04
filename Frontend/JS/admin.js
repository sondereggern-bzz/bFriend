const BASE_URL = "http://localhost:3000";

/* TODO: Finish integration and all */
let data;

const getAllData = async () => {
    await fetch(`${BASE_URL}/api/`, {
        method: "GET"
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.error) {
            console.warn("An error occurd while requesting all data.");
            return null;
        } else {
            return response.json();
        }
    }).catch(error => {
        console.warn(error);
    })
};

document.addEventListener("DOMContentLoaded", function() {
    const users = [
        { userId: "1", fullName: "Max Mustermann", email: "max@example.com", hobbies: ["Tauchen", "Klettern"] },
        { userId: "2", fullName: "Erika Musterfrau", email: "erika@example.com", hobbies: ["Lesen", "Reisen"] },
        { userId: "3", fullName: "Hans Müller", email: "hans@example.com", hobbies: ["Fotografie", "Radfahren"] },
    ]; // TODO: Replace by getAllData();

    const userList = document.getElementById("userList");
    const userProfile = document.getElementById("userProfile");
    const searchTermInput = document.getElementById("searchTerm");

    const displayUsers = (users) => {
        userList.innerHTML = "";
        users.forEach(user => {
            const userItem = document.createElement("div");
            userItem.className = "user-item";
            userItem.textContent = `${user.fullName} (ID: ${user.userId})`;
            userItem.addEventListener("click", () => displayUserProfile(user));
            userList.appendChild(userItem);
        });
    }

    const displayUserProfile = (user) => {
        userProfile.innerHTML = `
            <h3>Benutzerprofil</h3>
            <p><strong>Benutzer-ID:</strong> ${user.userId}</p>
            <p><strong>Vollständiger Name:</strong> ${user.fullName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Hobbys:</strong> ${user.hobbies.join(", ")}</p>
        `;
        userProfile.style.display = "block";
    }

    const filterUsers = () => {
        const searchTerm = searchTermInput.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            user.userId.includes(searchTerm) || 
            user.fullName.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    }

    displayUsers(users);

    searchTermInput.addEventListener("input", filterUsers)
});


document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const searchTerm = document.getElementById("searchTerm").value;
    const userProfile = document.getElementById("userProfile");

    const profile = fetchUserProfile(searchTerm);

    if (profile) {
        userProfile.innerHTML = `
            <h3>Benutzerprofil</h3>
            <p><strong>Benutzer-ID:</strong> ${profile.userId}</p>
            <p><strong>Vollständiger Name:</strong> ${profile.fullName}</p>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Hobbys:</strong> ${profile.hobbies.join(", ")}</p>
        `;
        userProfile.style.display = "block";
    } else {
        userProfile.innerHTML = "<p>Kein Benutzerprofil gefunden.</p>";
        userProfile.style.display = "block";
    }
});

/* TODO: Integrate with API */
const fetchUserProfile = (searchTerm) => {
    const userProfiles = [
        { userId: "1", fullName: "Max Mustermann", email: "max@example.com", hobbies: ["Tauchen", "Klettern"] },
        { userId: "2", fullName: "Erika Musterfrau", email: "erika@example.com", hobbies: ["Lesen", "Reisen"] },
        { userId: "3", fullName: "Hans Müller", email: "hans@example.com", hobbies: ["Fotografie", "Radfahren"] }
    ];

    return userProfiles.find(profile => profile.userId === searchTerm || profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
};
