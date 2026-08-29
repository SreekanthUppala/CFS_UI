import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <h2>User Directory</h2>

                <div className="nav-links">
                    <Link to="/">List</Link>
                    <Link to="/add">Add</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;