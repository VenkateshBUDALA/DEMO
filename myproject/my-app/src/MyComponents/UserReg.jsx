import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const UserReg = () => {
    // State variables for user registration and login
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [dept, setDept] = useState('');
    const [unit, setUnit] = useState('');
    const [password, setPassword] = useState('');
   
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    // State variables for user deletion
    const [deleteUsername, setDeleteUsername] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigate = useNavigate();
    
    // Registration function
 const handleRegister = async () => {
    // Validation
    if (userId.length < 5) {
        setError("User ID must be at least 5 characters long.");
        return;
    }
    if (username.length < 5) {
        setError("Username must be at least 5 characters long.");
        return;
    }
    if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }

    setError(''); // Clear previous errors

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        const response = await axios.post("http://localhost:8080/api/register", {
            userid: userId,
            username: username,
            department: dept,
            unit: unit,
            password: hashedPassword
        },{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        if (response.status === 200) {
            alert("Registration successful.! You can now log in ");
            // Clear fields
            setUserId("");
            setUsername("");
            setDept("");
            setUnit("");
            setPassword(""); 
        } else {
            setError("Registration failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        setError("An error occurred. Please try again.");
    }
};
    // Function to handle user deletion
    const handleDelete = async () => {
        const confirmation = window.confirm(`Are you sure you want to delete the user with username: ${deleteUsername}?`);

        if (confirmation) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/delete/${deleteUsername}`, {
                    data: {
                        username: deleteUsername,
                        password: deletePassword
                    }
                });

                if (response.status === 200 || response.status === 204) {
                    alert('User deleted successfully!');
                    navigate('/'); // Redirect or refresh after deletion
                } else {
                    setError('Failed to delete user. Check your credentials.');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('An error occurred while deleting user.');
            }
        }
        setShowDeleteModal(false); // Close delete modal after action
    };

    // Open delete modal with user id and username
    const openDeleteModal = (id, username) => {
        setDeleteUsername(username); // Set username for confirmation
        setDeletePassword(''); // Reset password input for deletion
        setShowDeleteModal(true); // Show delete modal
    };

   
    // Handle user login
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const userData = await response.json();  
                alert("Login successful. Navigating to user update page...");
                handleCloseModal();
                navigate(`/user-update/${userData.id}?username=${userData.username}`);
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("An error occurred. Please try again.");
        }
    };

    // Handle closing the modal and resetting error messages
    const handleCloseModal = () => {
        setShowModal(false);
        setUsername(''); // Reset username field when modal is closed
        setPassword(''); // Reset password field when modal is closed
        setError(''); // Reset error message on close
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Show the modal for updating user info
    const handleUpdateClick = () => {
        setShowModal(true); // Show login modal for updating user info
    };

    return (
        <>
            <div className="card">
                <h1 className="v">USER REGISTRATION</h1>
                <div className="v">
                    <input type="text" placeholder="UserID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                </div>
                <div className="v">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="v">
                    <input type="text" placeholder="Department" value={dept} onChange={(e) => setDept(e.target.value)} required />
                </div>
                <div className="v">
                    <input type="text" placeholder="UNIT" value={unit} onChange={(e) => setUnit(e.target.value)} required />
                </div>
                <div className="v">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <span onClick={togglePasswordVisibility} className="Eye">
                        {showPassword ? <FaEye />: <FaEyeSlash /> } 
                    </span>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <div style={{ display: 'flex', justifyContent: 'center', marginRight: '20px auto' }}>
                    <button className="v btn btn-success" onClick={handleRegister}>REGISTER</button>
                </div>
                <div className="v" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={handleUpdateClick}>UPDATE</button>
                    <button className="btn btn-danger" onClick={openDeleteModal}>DELETE</button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 'auto' }}>Login for Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="v">
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="v password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="password-icon Eye">
                            {showPassword ? <FaEye />:<FaEyeSlash /> } 
                        </span>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>} 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 'auto' }}>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="v">
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={deleteUsername}
                            onChange={(e) => setDeleteUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="v password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="password-icon Eye">
                            {showPassword ?  <FaEye />: <FaEyeSlash />} 
                        </span>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>} 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default UserReg;
