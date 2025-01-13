import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        userNAme: "",
        password: "",
        email: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", formData);
            alert("Registration successful!");
        } catch (error) {
          //  console.error("Registration error", error);
            alert("Registration failed!");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
