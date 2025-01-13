import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
//checking status
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", formData);
            if (response.data) {
                alert("Login successful!");
            } else {
                alert("Invalid credentials!");
            }
        } catch (error) {
            console.error("Login error", error);
            alert("Login failed!");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
}
export default Login;
