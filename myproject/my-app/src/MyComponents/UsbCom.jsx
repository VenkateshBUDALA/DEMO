import React, { useState, useEffect } from 'react';
import FetchData from './FetchData'; // Component to fetch UUIDs and Serial Numbers
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
const UsbCom = () => {
    const [usbDetails, setUsbDetails] = useState({
        usbname: '',
        Uuid: '',
        serialNumber: '',
        password: ''
    });
    const [usbNames, setUsbNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedUsb, setSelectedUsb] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsbNames();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsbDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    // Fetch USB names from backend
    const fetchUsbNames = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/usb/names");
            if (response.status === 200) {
                setUsbNames(response.data);
            }
        } catch (error) {
            console.error("Error fetching USB names:", error);
            setError("Failed to load USB names.");
        }
    };

    // USB Registration
    const handleRegister = async (e) => {
        e.preventDefault();
        if (usbDetails.usbname.length < 5) {
            setError("USB Name must be at least 5 characters long.");
            return;
        }
        if (usbDetails.serialNumber.length < 5) {
            setError("Serial Number must be at least 5 characters long.");
            return;
        }

        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(usbDetails.password, salt);
            const usbData = { ...usbDetails, password: hashedPassword };
            
            const response = await axios.post("http://localhost:8080/api/register", usbData);
            if (response.status === 200) {
                alert("Registration successful!");
                setUsbDetails({ usbname: '', Uuid: '', serialNumber: '', password: '' });
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Error registering USB:', error);
            setError("An error occurred. Please try again.");
        }
    };

    // Handle Update Navigation
    const handleUpdate = () => {
        
        if (selectedUsb) {
            navigate(`/usb-update/${selectedUsb}`);
        } else {
            setError("Please select a USB to update.");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/usb/delete', {
                params: { usbName: selectedUsb }, // Only send usbName
            });
    
            if (response.status === 200) {
                alert('USB deleted successfully!');
                fetchUsbNames(); // Refresh USB names after deletion
            }
        } catch (error) {
            console.error('Error deleting USB:', error.response?.data || error.message);
            setError('Failed to delete USB. It may not exist.');
        }
    };
    // Filter USB names based on search term
    const filteredUsbNames = usbNames.filter(name => 
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="card">
                <h1>USB REGISTRATION</h1>
                
                {/* Registration Form */}
                <form onSubmit={handleRegister}>
                    <div className='v'>
                        <input 
                            type="text"  
                            placeholder="USB Name" 
                            name="usbname"
                            value={usbDetails.usbname}
                            onChange={handleChange}
                            required  
                             
                        />
                    </div>
                  
                    <div className='v'>
                        <select name="Uuid" value={usbDetails.Uuid} onChange={handleChange} style={{ width: '150px', marginRight: '70px' }}>
                            <option>Select UUID</option>
                            {/* UUIDs will be populated by FetchData component */}
                        </select>
                    </div>

                    <div className='v'>
                        <input 
                            type="text" 
                            placeholder="Serial Number"
                            name="serialNumber"
                            value={usbDetails.serialNumber}
                            onChange={handleChange}
                            required 
                            style={{ width: '150px', marginLeft: '-70px' }}
                        />
                    </div>
                   
              
                </form>

                <FetchData 
                    onFetchUuids={(uuids) => {/* Handle fetched UUIDs if needed */}}
                    onFetchSerialNumber={(number) => setUsbDetails(prev => ({ ...prev, serialNumber: number }))} 
                />

                <div style={{ marginTop: '-20px' }}>
                    <button type="submit" className="btn btn-success" onClick={handleRegister}>REGISTER</button>
                </div>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Update and Delete Section */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', margin: 'auto', alignItems: 'center' }}>
                    <div  className='v'>
                        <input style={{width:'120px'}}
                            className='v'
                            type="text" 
                            placeholder="Search USB" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                        <button className='btn btn-primary' onClick={handleUpdate} style={{ marginLeft: '10px' }}>UPDATE</button>
                        <button className='btn btn-danger'  onClick={handleDelete} style={{ marginLeft: '10px' }}>DELETE</button>
                        
                        {/* Display filtered USB names */}
                        {searchTerm && (
                            <ol style={{ listStyle: 'none', marginRight: '200px' }}>
                                {filteredUsbNames.map(name => (
                                    <li
                                        key={name}
                                        onClick={() => {
                                            setSelectedUsb(name);
                                            setSearchTerm(name); // Optionally set search term to selected name
                                        }}
                                        style={{ 
                                            cursor: 'pointer', 
                                            borderRadius: '15px', 
                                            padding: '5px', 
                                            backgroundColor: selectedUsb === name ? '#ddd' : 'transparent'
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
        </>
    );
};

export default UsbCom;
