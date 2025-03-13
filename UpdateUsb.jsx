import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const UpdateUsb = () => {
  const { usbId } = useParams();
  const navigate = useNavigate();

  const [usb, setUsb] = useState({
    usbName: '',
    uuid: [],
    uuidname: [],
    serialNumber: '',
    username: '',
  });

  const [userNames, setUserNames] = useState([]);
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [uuids, setUuids] = useState([]);
  const [uuidnames, setuuidnames] = useState([]);
  const [error, setError] = useState('');

  const dashBoard = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchUsbDetails();
    fetchUserNames();
    fetchSerialNumbers();
  }, [usbId]);

  const fetchUsbDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usb/${usbId}`);
      if (response.status === 200) {
        const usbData = response.data;
        setUsb({
          ...usbData,
          uuid: usbData.uuid ? usbData.uuid.split(',') : [],
          uuidname: usbData.uuidname ? usbData.uuidname.split(',') : [],
        });
        fetchUuids(usbData.serialNumber);
      } else {
        setError('Failed to load USB details.');
      }
    } catch (error) {
      console.error('Error fetching USB details:', error.response || error.message);
      setError('Failed to load USB details.');
    }
  };

  const fetchUserNames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/usernames');
      if (response.status === 200) {
        setUserNames(response.data);
      } else {
        setError('Failed to load user details.');
      }
    } catch (error) {
      console.error('Error fetching usernames:', error);
      setError('Failed to load usernames.');
    }
  };

  const fetchSerialNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/usb/serials');
      if (response.status === 200) {
        setSerialNumbers(response.data);
      }
    } catch (error) {
      console.error('Error fetching serial numbers:', error);
      setError('Failed to load serial numbers.');
    }
  };

  const fetchUuids = async (selectedSerial) => {
    if (!selectedSerial) return;
    try {
      const response = await axios.get(`http://localhost:8081/api/usb/partitions?serial=${selectedSerial}`);
      if (response.status === 200) {
        const uuidEntries = Object.entries(response.data);
        setUuids(uuidEntries);
      }
    } catch (error) {
      console.error('Error fetching UUIDs:', error);
      setError('Failed to load UUIDs.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsb = {
      ...usb,
      uuid: usb.uuid.join(','),
      uuidname: usb.uuidname.join(','),
    };
  
    axios
      .put(`http://localhost:8080/api/usb/${usbId}`, updatedUsb)
      .then(() => {
        alert('USB updated successfully!');
        navigate('/usbDetails');
      })
      .catch((error) => {
        console.error('Error updating USB:', error);
        alert('Error updating USB!');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsb((prevUsb) => ({
      ...prevUsb,
      [name]: value,
    }));

    if (name === 'serialNumber') {
      setUuids([]); // Clear UUIDs
      setuuidnames([]);
      setUsb((prevUsb) => ({
        ...prevUsb,
        uuid: [],
        uuidname: [],
      }));
      fetchUuids(value);
    }
  };

  const handleUuidChange = (uuid, label, checked) => {
    setUsb((prevUsb) => {
      let updatedUuids = [...prevUsb.uuid];
      let updatedUuidNames = [...prevUsb.uuidname];

      if (checked) {
        updatedUuids.push(uuid);
        updatedUuidNames.push(label);
      } else {
        updatedUuids = updatedUuids.filter((item) => item !== uuid);
        updatedUuidNames = updatedUuidNames.filter((item) => item !== label);
      }

      return { ...prevUsb, uuid: updatedUuids, uuidname: updatedUuidNames };
    });
  };

  return (
    <div className="container-fluid p-2">
      <div  className="row">
        <div className="col-md-6 text-start">
          <button className="btn btn-info" type="button" onClick={() => navigate('/usbDetails')}>
            GO BACK
          </button>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-dark" onClick={dashBoard}>
            <FontAwesomeIcon icon={faHome} size="sm" style={{ color: 'white', fontSize: '18px', marginRight: '5px' }} />
            HOME
          </button>
        </div>
      </div>
      <div style={{ marginTop: '20px' }} className=" card jumbotron p-4 bg-white rounded">
        <h1>USB UPDATION</h1>
        <form onSubmit={handleSubmit}>
          <div className="v">
            <input
              type="text"
              placeholder="USB Name"
              name="usbName"
              value={usb.usbName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="v">
            <select style={{ width: '40%' }} name="username" value={usb.username} onChange={handleChange} required>
              <option value="">Select User</option>
              {userNames.length > 0 ? (
                userNames.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))
              ) : (
                <option disabled>No users available</option>
              )}
            </select>
          </div>

          <div className="v">
            <select name="serialNumber" value={usb.serialNumber} onChange={handleChange} style={{ width: '40%'}}>
              <option value="">Select Serial Number</option>
              {serialNumbers.map((serial, index) => (
                <option key={index} value={serial}>
                  {serial}
                </option>
              ))}
            </select>
          </div>

          <div className="v">
            <div>
              {uuids.map(([uuid, label], index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={usb.uuid.includes(uuid)}
                    onChange={(e) => handleUuidChange(uuid, label, e.target.checked)}
                  />
                  {uuid} - {label}
                </div>
              ))}
            </div>
          </div>

          {/* <button
            type="button"
            className="btn btn-secondary p-3"
            onClick={() => {
              fetchSerialNumbers();
              fetchUuids(usb.serialNumber);
            }}
            style={{ marginTop: '-110px', marginLeft: '170px' }}
          >
            Fetch
          </button> */}
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-success">
              UPDATE
            </button>
          </div>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default UpdateUsb;