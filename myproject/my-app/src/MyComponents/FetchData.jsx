import React, { useState } from 'react';
import axios from 'axios';
const FetchData = ({ onFetchUuids, onFetchSerialNumber }) => {
    const [uuidList, setUuidList] = useState([]);
    const [serialNumber, setSerialNumber] = useState('');
    // Function to fetch UUIDs
    const fetchUuids = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/uuids");
            setUuidList(response.data); // Assuming response.data is an array of UUIDs
            onFetchUuids(response.data); // Pass the UUIDs to the parent
        } catch (error) {
            console.error('Error fetching UUIDs:', error);
        }
    };
    // Function to fetch Serial Number
    const fetchSerialNumber = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/serial");
            setSerialNumber(response.data.serialNumber); // Assuming response.data contains serialNumber
            onFetchSerialNumber(response.data.serialNumber); // Pass the serial number to the parent
        } catch (error) {
            console.error('Error fetching Serial Number:', error);
        }
    };
    return (
        <div >
            <button style={{marginTop:'-155px',marginLeft:'170px'}} className="btn btn-fetch btn-secondary p-1" onClick={fetchUuids}>Fetch</button>
            <button style={{marginTop:'-57px',marginLeft:'-50px'}}  className="btn btn-fetch btn-secondary p-1" onClick={fetchSerialNumber}>Fetch</button>
            <ul>
                {uuidList.map((uuid, index) => (
                    <li key={index}>{uuid}</li>
                ))}
            </ul>
            {serialNumber && <p>Fetched Serial Number: {serialNumber}</p>}
        </div>
    );
};
export default FetchData;
