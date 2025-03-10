import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bcrypt from 'bcryptjs';
const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [showpassword, setShowpassword] = useState(false);
    const [password] = useState('');
    
    // State to hold user details
    const [user, setUser] = useState({
        userid: '',
        username: '',
        department: '',
        unit: '',
        password: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const username = queryParams.get('username'); // Get username from query params

                if (!username) {
                    setError('Username is missing from the query parameters.');
                    return;
                }

                console.log("Username from query parameters:", username);

                // Fetch user details from backend with the username
                const response = await fetch("http://localhost:8080/api/getdetails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username }), // Make sure 'username' is being sent as expected
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUser(data); // Set the user state with the fetched data, including userId
                    setpasswordEmpty(); // Clear the password initially
                } else {
                    setError('Failed to fetch user details.');
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError('An error occurred while fetching user details.');
            }
        };

        fetchUserDetails();
    }, [location.search]);

    // Handle user details input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Function to clear password field initially
    const setpasswordEmpty = () => {
        setUser(prevUser => ({ ...prevUser, password: '' })); // Set password field to empty
    };

    // Toggle password visibility
    const togglepasswordVisibility = () => {
        setShowpassword(!showpassword);
    };

    // Handle user update submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        const salt = bcrypt.genSaltSync(10);
           user.password = bcrypt.hashSync(password, salt);
           
        try {
            console.log("user is handlesubmit")
            console.log(user);

            const response = await fetch(`http://localhost:8080/api/update/${id}`, { // Update endpoint to match your backend
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user), // Send updated user data including username and password
            });

            if (response.ok) {
                const updatedUser = await response.json();
                alert('User updated successfully!');
                console.log('Updated User:', updatedUser);
                navigate('/UserReg');
            } else {
                setError('Failed to update user details.');
            }
        } catch (err) {
            console.error('Error updating user details:', err);
            setError('An error occurred while updating user details.');
        }
    };

    return (
        <div className="card">
            <h1 className="v">Update User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="v">
                    <input
                        type="text"
                        name="userid" // Match with the user state field
                        placeholder="Enter userid"
                        value={user.userid}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="v">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter UserName"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="v">
                    <input
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={user.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="v">
                    <input
                        type="text"
                        name="unit"
                        placeholder="Enter UNIT"
                        value={user.unit}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="v password-input">
                    <input
                        type={showpassword ? "text" : "password"}
                        name="password" // Added name attribute to link to state
                        placeholder="Enter New password" // Clarify that the user enters a new password
                        value={user.password} // Link this to user state
                        onChange={handleChange}
                    />
                    <span onClick={togglepasswordVisibility} className="password-icon Eye">
                        {showpassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className="v">
                    <button type="submit" className="btn btn-success">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UserUpdate;
