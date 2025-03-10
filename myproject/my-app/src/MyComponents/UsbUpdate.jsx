import React,{useState,useEffect} from 'react'
import axios from 'axios';
import FetchData from './FetchData'; // Component to fetch UUIDs and Serial Numbers
import { useNavigate } from 'react-router-dom/dist';
const UsbUpdate = () => {
    const [usbDetails, setUsbDetails] = useState({
        usbname: '',
        Uuid: '',
        serialNumber: '',
    });
    const [usbNames, setUsbNames] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsbNames();
    }, []);

     const navigate = useNavigate();
        const Updated=()=>{
        if(true){
            alert('Successfully Updated..!')
            navigate('/UsbCom');
        }
        }
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

  return (

      <div className="card">
                <h1>USB UPDATE</h1>
                
                {/* Registration Form */}
                <form>
                    <div className='v'>
                        <label>USB NAME :</label>
                        <input
                
                style={{marginRight:'130px',width:'210px'}}
                            type="text"  
                            placeholder="USB Name" 
                            name="usbname"
                            value={usbDetails.usbname}
                           
                            required     
                        />
                    </div>
                    <div className='v'>
                        <select name="Uuid" value={usbDetails.Uuid} style={{ width: '150px', marginRight: '70px' }}>
                            <option>Select UUID</option>
                            {/* UUIDs will be populated by FetchData component */}
                        </select>
                    </div>

                    <div className='v'>
                    <label>SERIAL NUMBER :</label>
                        <input 
                        style={{marginRight:'180px',width:'140px'}}
                            type="text" 
                            placeholder="Serial Number"
                            name="serialNumber"
                            value={usbDetails.serialNumber}
                            required 
                           
                        />
                    </div>
                </form>
                <FetchData 
                    onFetchUuids={(uuids) => {/* Handle fetched UUIDs if needed */}}
                    onFetchSerialNumber={(number) => setUsbDetails(prev => ({ ...prev, serialNumber: number }))}
                />

                <div style={{ marginTop: '1px',marginRight:'30px' }}>
                    <button type="submit" className="btn btn-success " onClick={Updated}>UPDATE</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
export default UsbUpdate
