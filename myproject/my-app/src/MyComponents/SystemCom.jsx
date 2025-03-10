import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SystemCom = () => {
    const [systemDetails, setSystemDetails] = useState({
        systemname: '',
        servicenumber: '',
        ipaddress: '',
        macaddress: '',
        policy: '',
    });
    const [systemNames, setSystemNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedSystemForUpdate, setSelectedSystemForUpdate] = useState('');
    const [selectedSystemForDelete, setSelectedSystemForDelete] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSystemDetails({ ...systemDetails, [name]: value });
    };

    // Fetch all system names for search and update/delete
    const fetchSystemNames = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/sys/names");
            if (response.status === 200) {
                setSystemNames(response.data);
            }
        } catch (error) {
            console.error("Error fetching system names:", error);
            setError("Failed to load system names.");
        }
    };

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();

        if (systemDetails.systemname.length < 5 || systemDetails.servicenumber.length < 5 || 
            systemDetails.ipaddress.length < 5 || systemDetails.macaddress.length < 5) {
            setError("All fields must be at least 5 characters long.");
            return;
        }
        setError('');

        try {
            const response = await axios.post("http://localhost:8080/api/sys/register", systemDetails, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                alert("Registration successful!");
                window.location.reload();
              
                setSystemDetails({
                    systemname: '',
                    servicenumber: '',
                    ipaddress: '',
                    macaddress: '', 
                    policy: '',
                });
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        fetchSystemNames();
    }, []);

    // Filter system names based on search term
    const filteredSystemNames = systemNames.filter(name => 
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle system update navigation
    const handleUpdate = () => {
        if (selectedSystemForUpdate) {
            console.log("xyz");
            console.log(selectedSystemForUpdate);
            navigate(`/update-system/${selectedSystemForUpdate}`);
        } else {
            setError("Please select a system to update.");
        }
    };

    // Handle system deletion
    const handleDelete = async () => {
        console.log(selectedSystemForDelete);
        if (selectedSystemForDelete) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/sys/delete/${selectedSystemForDelete}`);
                if (response.status === 200) {
                    alert("System deleted successfully!");
                    setSelectedSystemForDelete('');
                    fetchSystemNames(); // Refresh the list after deletion
                } else {
                    setError("Failed to delete system.");
                }
            } catch (error) {
                console.error("Error during system deletion:", error);
                setError("An error occurred while deleting the system.");
            }
        } else {
            setError("Please select a system to delete.");
        }
    };

    return (
        <div className="card">
            <h1 className="v">SYSTEM REGISTRATION</h1>

            <form onSubmit={handleRegister}>
                <div className='v'>
                    <input
                        type="text"
                        name="systemname"
                        placeholder="System Name"
                        value={systemDetails.systemname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='v'>
                    <input
                        type="text"
                        name="servicenumber"
                        placeholder="Service Number"
                        value={systemDetails.servicenumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='v'>
                    <input
                        type="text"
                        name="ipaddress"
                        placeholder="IP Address"
                        value={systemDetails.ipaddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='v'>
                    <input
                        type="text"
                        name="macaddress"
                        placeholder="MAC Address"
                        value={systemDetails.macaddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='v'>
                    <select style={{ width: '220px' }} name="policy" value={systemDetails.policy} onChange={handleChange}>
                        <option>Select Policy</option>
                        <option value="privacy">Privacy</option>
                        <option value="security">Security</option>
                    </select>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="v" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="btn btn-success" type="submit">REGISTER</button>
                </div>
            </form>

            {/* Search, Update, and Delete */}
            <div style={{ display: 'flex', flexDirection:'row', gap: '10px', margin: 'auto', alignItems: 'center' }}>
                <div  className='v'>
                    <input style={{width:'130px'}}
                        className='v'
                        type="text"
                        placeholder="Search System"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button style={{ marginLeft: '10px' }} className='btn btn-primary' onClick={handleUpdate}>UPDATE</button>
                    <button style={{ marginLeft: '10px' }} className='btn btn-danger' onClick={handleDelete}>DELETE</button>

                    {searchTerm && (
                        <ol style={{ listStyle: 'none', marginRight: '200px' }}>
                            {filteredSystemNames.map(name => (
                                <li
                                    key={name}
                                    onClick={() => {
                                       
                                        setSelectedSystemForUpdate(name);
                                        setSelectedSystemForDelete(name);
                                        setSearchTerm(name); // Optionally set the search term to the selected name
                                       
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '15px',
                                        padding: '5px',
                                        backgroundColor: selectedSystemForUpdate === name ? '#ddd' : 'transparent',
                                    }}
                                >
                                    {name}
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SystemCom;
