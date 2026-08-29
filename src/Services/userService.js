const API_URL = "https://localhost:7034/api/user";


// GET ALL USERS
export async function getUsers() {
    const response = await fetch(API_URL);

    const result = await response.json();

    if (!response.ok || !result.succeeded) {
        throw new Error(
            result.error || "Failed to load users"
        );
    }

    return result.data || [];
}


// GET USER BY ID
export async function getUser(id) {
    const response = await fetch(`${API_URL}/${id}`);

    const result = await response.json();

    if (!response.ok || !result.succeeded) {
        throw new Error(
            result.error || "Failed to load user"
        );
    }

    return result.data;
}


// CREATE USER
export async function createUser(user) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const result = await response.json();

    if (!response.ok || !result.succeeded) {
        throw new Error(
            result.error || "Failed to create user"
        );
    }

    return result.data;
}


// UPDATE USER
export async function updateUser(user) {
    const response = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const result = await response.json();

    if (!response.ok || !result.succeeded) {
        throw new Error(
            result.error || "Failed to update user"
        );
    }

    return result.data;
}


// DELETE USER
export async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok || !result.succeeded) {
        throw new Error(
            result.error || "Failed to delete user"
        );
    }

    return result.data;
}