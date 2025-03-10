import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateSystem = () => {
    const { systemname } = useParams(); // Get system name from URL
    console.log("Fetching system names:", systemname);

    const [systemDetails, setSystemDetails] = useState({
        systemname: '',
        servicenumber: '',
        ipaddress: '',
        macaddress: '',
        policy: ''
    });
    const [error, setError] = useState('');

    // Fetch system details based on systemName
    useEffect(() => {
        const fetchSystemDetails = async () => {
            try {
                if (!systemname) {
                    setError("System name is missing.");
                    return;
                }
                console.log("Fetching system details for:", systemname);
                // Fetch system details from backend
                const response = await axios.get(`http://localhost:8080/api/sys/${systemname}`);

                if (response.status === 200) {
                    setSystemDetails(response.data); // Set system details if the request is successful
                } else {
                    setError("Failed to load system details.");
                }
            } catch (error) {
                setError("Failed to load system details.");
            }
        };

        if (systemname) {
            fetchSystemDetails(); // Fetch only if systemname is not empty
        }
    }, [systemname]);

    // Handle update request
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Check if any required fields are empty before sending the request
        if (!systemDetails.systemname || !systemDetails.servicenumber || !systemDetails.ipaddress || !systemDetails.macaddress) {
            setError("Please fill all the fields.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/sys/update/${systemname}`, systemDetails, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200) {
                alert("System updated successfully!");
            } else {
                setError("Failed to update system.");
            }
        } catch (error) {
            console.error("Error during update:", error);
            setError("Error updating system.");
        }
    };

    return (
        <div className="card">
            <h1>Update System</h1>
            <form onSubmit={handleUpdate}>
                <div className="v">
                    <input
                        type="text"
                        name="systemname"
                        placeholder="System Name"
                        value={systemDetails.systemname}
                        onChange={(e) => setSystemDetails({ ...systemDetails, systemname: e.target.value })}
                        required
                    />
                </div>
                <div className="v">
                    <input
                        type="text"
                        name="servicenumber"
                        placeholder="Service Number"
                        value={systemDetails.servicenumber}
                        onChange={(e) => setSystemDetails({ ...systemDetails, servicenumber: e.target.value })}
                        required
                    />
                </div>
                <div className="v">
                    <input
                        type="text"
                        name="ipaddress"
                        placeholder="IP Address"
                        value={systemDetails.ipaddress}
                        onChange={(e) => setSystemDetails({ ...systemDetails, ipaddress: e.target.value })}
                        required
                    />
                </div>
                <div className="v">
                    <input
                        type="text"
                        name="macaddress"
                        placeholder="MAC Address"
                        value={systemDetails.macaddress}
                        onChange={(e) => setSystemDetails({ ...systemDetails, macaddress: e.target.value })}
                        required
                    />
                </div>
                <div className="v">
                    Choose Policy:
                    <select value={systemDetails.policy} onChange={(e) => setSystemDetails({ ...systemDetails, policy: e.target.value })}>
                        <option value="">Select Policy</option>
                        <option value="privacy">Privacy</option>
                        <option value="security">Security</option>
                    </select>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="v" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="btn btn-success">Update</button>
                </div>
            </form>
        </div>
    );
};
export default UpdateSystem;
