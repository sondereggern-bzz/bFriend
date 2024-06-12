const BASE_URL = "http://localhost:3000";

/* TODO: Finish integration and all */
let data;
let userList;
let userProfile;
let searchTermInput;
let currentPage = 1;

const getAllData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/?page=${currentPage}`, {
            method: "GET"
        });
        if (response.ok) {
            const dt = await response.json();
            return dt;
        } else {
            console.warn("An error occurred while requesting all data.");
            return null;
        }
    } catch (error) {
        console.warn(error);
        return null;
    }
};

const getUserProfile = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
            method: "GET"
        });
        if (response.ok) {
            const userData = await response.json();
            displayUserProfile(userData);
        } else {
            console.warn("An error occurred while fetching user profile.");
        }
    } catch (error) {
        console.warn(error);
    }
};

const searchProfile = async (searchTerm) => {
    try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const getFilter = () => `&filter=${encodedSearchTerm}&filtertype=${isNaN(parseInt(searchTerm)) ? 'string' : 'number'}`;
        const URL = searchTerm ? `${BASE_URL}/api/users/?page=${currentPage}${getFilter()}` : `${BASE_URL}/api/users/?page=${currentPage}`;
        const response = await fetch(URL, {
            method: "GET"
        });
        if (response.ok) {
            const dt = await response.json();
            return dt;
        } else {
            console.warn("An error occurred while requesting all data.");
            return null;
        }
    } catch (error) {
        console.warn(error);
        return null;
    }
}


/* Frontend Functions */

const displayUsers = (users) => {
    userList.innerHTML = "";

    users.forEach(user => {
        const userItem = document.createElement("div");
        userItem.className = "user-item";
        userItem.textContent = `${user.firstname} ${user.lastname} (ID: ${user.ID})`;
        userItem.setAttribute("data-user-id", user.ID);
        userItem.addEventListener("click", () => getUserProfile(user.ID));
        userList.appendChild(userItem);
    });
}

const displayUserProfile = (user) => {
    const userProfile = document.getElementById('userProfile');
    
    let profileHtml = `
        <h3>Benutzerprofil</h3>
        <p><strong>Benutzer-ID:</strong> ${user.ID || 'Keine Benutzer-ID gefunden'}</p>
        <p><strong>Vollständiger Name:</strong> ${(user.firstname && user.lastname) ? `${user.firstname} ${user.lastname}` : 'Kein Name gefunden'}</p>
        <p><strong>Email:</strong> ${user.email || 'Keine Email gefunden'}</p>
        <p><strong>Geschlecht:</strong> ${user.gender || 'Kein Geschlecht gefunden'}</p>
        <p><strong>Rolle:</strong> ${user.role || 'Keine Rolle gefunden'}</p>
        <p><strong>Abonnement:</strong> ${user.subscription ? `${user.subscription.name} - ${user.subscription.price}€` : 'Kein Abonnement gefunden'}</p>
    `;

    profileHtml += `
        <h4>Adresse</h4>
        <p>${user.address ? `${user.address.street || 'Keine Straße gefunden'} ${user.address.houseNumber || ''}, ${user.address.city || 'Keine Stadt gefunden'}, ${user.address.country || 'Kein Land gefunden'}` : 'Keine Adresse gefunden'}</p>
    `;

    profileHtml += `
        <h4>Hobbys</h4>
        <p>${user.hobbys && user.hobbys.length > 0 ? user.hobbys.join(", ") : 'Keine Hobbys gefunden'}</p>
    `;

    profileHtml += `
        <h4>Zahlung</h4>
        <p>${user.payment ? `${user.payment.fullname || 'Kein Name gefunden'}, IBAN: ${user.payment.iban || 'Keine IBAN gefunden'}, BIC: ${user.payment.bic || 'Keine BIC gefunden'}` : 'Keine Zahlungsinformationen gefunden'}</p>
    `;

    userProfile.innerHTML = profileHtml;
    userProfile.style.display = "block";
}

const filterUsers = async () => {
    userProfile.innerHTML = "";
    const searchTerm = searchTermInput.value.toLowerCase();
    data = await searchProfile(searchTerm);
    data = data.sort((a, b) => a.ID - b.ID);
    displayUsers(data);
}

document.addEventListener("DOMContentLoaded", async () => {
    updateCurrentPageText();
    data = await getAllData();
    data = data.sort((a, b) => a.ID - b.ID);

    userList = document.getElementById("userList");
    userProfile = document.getElementById("userProfile");
    searchTermInput = document.getElementById("searchTerm");

    displayUsers(data);

    searchTermInput.addEventListener("input", filterUsers)
});


document.getElementById("searchForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const profile = await filterUsers();

    if (profile) {
        displayUserProfile(profile);
    } else {
        userProfile.innerHTML = "<p>Kein Benutzerprofil gefunden.</p>";
        userProfile.style.display = "block";
    }
});

const updateCurrentPageText = () => {
    const currentPageText = document.getElementById("currentPageText");
    currentPageText.textContent = `Page ${currentPage}`;
};

const nextPage = async () => {
    currentPage++;
    updateCurrentPageText();
    await fetchData();
};

const prevPage = async () => {
    if (currentPage > 1) {
        currentPage--;
        updateCurrentPageText();
        await fetchData();
    }
};

const fetchData = async () => {
    data = await getAllData();
    data = data.sort((a, b) => a.ID - b.ID);
    displayUsers(data);
};

document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("prevPage").addEventListener("click", prevPage);
