import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../Services/userService";
import { useNavigate } from "react-router-dom";
function List() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function loadUsers() {
        try {
            setLoading(true);
            setError("");

            const data = await getUsers();

            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

function handleEdit(id) 
{
    navigate(`/edit/${id}`);
}
    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteUser(id);

            setUsers(
                users.filter(user => user.id !== id)
            );
        } catch (err) {
            alert(err.message);
        }
    }

    if (loading) {
        return (
            <div className="center">
                <div className="spinner"></div>
                <p>Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error">
                    {error}
                </div>

                <button onClick={loadUsers}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Users</h1>
            </div>

            {users.length === 0 ? (
                <div className="empty-state">
                    <h3>No users found</h3>
                    <p>
                        Add your first user to get started.
                    </p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.city}</td>
                                    <td>{user.state}</td>
                                    <td>{user.pincode}</td>
                                    <td>
                                        <button
                                            className="edit-button" 
                                            style={{margin:"5px"}}
                                            onClick={() => handleEdit(user.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default List;