import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../Services/userService";

function Add() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        age: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    }

    function validate() {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        } else if (
            form.name.trim().length < 2 ||
            form.name.trim().length > 100
        ) {
            newErrors.name =
                "Name must be between 2 and 100 characters";
        }

        if (form.age === "") {
            newErrors.age = "Age is required";
        } else if (
            Number(form.age) < 0 ||
            Number(form.age) > 120
        ) {
            newErrors.age =
                "Age must be between 0 and 120";
        }

        if (!form.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!form.state.trim()) {
            newErrors.state = "State is required";
        }

        if (!form.pincode.trim()) {
            newErrors.pincode =
                "Pincode is required";
        } else if (
            form.pincode.length < 4 ||
            form.pincode.length > 10
        ) {
            newErrors.pincode =
                "Pincode must be between 4 and 10 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);

            await createUser({
                name: form.name.trim(),
                age: Number(form.age),
                city: form.city.trim(),
                state: form.state.trim(),
                pincode: form.pincode.trim()
            });

            alert("User added successfully!");

            navigate("/");
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="form-card">
                <h1>Add User</h1>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        {errors.name && (
                            <span className="validation-error">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Age</label>

                        <input
                            type="number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            min="0"
                            max="120"
                        />

                        {errors.age && (
                            <span className="validation-error">
                                {errors.age}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>City</label>

                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />

                        {errors.city && (
                            <span className="validation-error">
                                {errors.city}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>State</label>

                        <input
                            type="text"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                        />

                        {errors.state && (
                            <span className="validation-error">
                                {errors.state}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Pincode</label>

                        <input
                            type="text"
                            name="pincode"
                            value={form.pincode}
                            onChange={handleChange}
                        />

                        {errors.pincode && (
                            <span className="validation-error">
                                {errors.pincode}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading
                            ? "Saving..."
                            : "Add User"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Add;