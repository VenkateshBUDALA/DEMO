import React,{useState} from 'react'
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "./policy.css";

function PolicyUpdate() {
    const [policyName, setPolicyName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const fileExtensions = [
        { name: 'PDF', ext: '.pdf' },
        { name: 'Word Document', ext: '.docx' },
        { name: 'Excel Spreadsheet', ext: '.xlsx' },
        { name: 'Image File', ext: '.jpg' },
        { name: 'Text File', ext: '.txt' },
        { name: 'PowerPoint Presentation', ext: '.pptx' },
        { name: 'CSV File', ext: '.csv' },
        { name: 'Audio File', ext: '.mp3' },
        { name: 'Video File', ext: '.mp4' },
      ];
    
      const [selectedExtensions, setSelectedExtensions] = useState([]);
    
      // Handle the click on a file extension button
      const handleButtonClick = (ext) => {
        setSelectedExtensions((prevSelected) =>
          prevSelected.includes(ext)
            ? prevSelected.filter((item) => item !== ext) // Remove if already selected
            : [...prevSelected, ext] // Add if not already selected
        );
      };
      const FileTypes = () => {
        setShowModal(true);
     };
     const handleCloseModal = () => {
         setShowModal(false);
     };
     const NewPolicyUpdate = () => {
        if(true){
          alert('Successfully Updated.')
          navigate('/PolicyCom');
        }
        else{
          alert('Failed To Navigate UpdatePolicy.!!')
          navigate('/PolicyUpdate');
        }
       };
  return (
    
      <div className="card">
      <h1 className="v">POLICY UPDATION</h1>

      <div className="v">
        <input
          type="text"
          placeholder="Policy Name"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          required
        />
      </div>

      {["group", "owner", "guest"].map((role) => (
        <div key={role}>
          <label style={{ marginTop: "20px", marginRight: "270px" }}>{role.toUpperCase()}</label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              marginTop: "-30px",
              marginLeft: "200px",
              alignItems: "center",
            }}
          >
            <select>
              <option>READ</option>
              <option>WRITE</option>
              <option>BOTH</option>
              <option>DENY</option>
            </select>
            <button
              style={{ borderRadius: "15px" }}
              className="btn btn-secondary"
              onClick={() => {
                console.log("FileType button clicked for role:", role);
                FileTypes();
                 //setSelectedRole(role); // Track which role's file type is selected
                // fetchFileTypes(); // Fetch file types from backend when clicked

              }}
            >
              FileType
            </button>
          </div>
         
        </div>
      ))}
       <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 'auto'}}>SELECT FILE TYPES</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px',justifyContent:'center' }}>
        {fileExtensions.map(({ name, ext }) => (
          <button
            key={ext}
            onClick={() => handleButtonClick(ext)}
            style={{
              padding: '10px',
              backgroundColor: selectedExtensions.includes(ext) ? '#4CAF50' : '#f1f1f1',
              color: selectedExtensions.includes(ext) ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {name}
          </button>
        ))}
      </div>
                </Modal.Body>
                <Modal.Footer>
  <div style={{
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center', // Vertically center the buttons
    marginTop: '20px',
    width: '100%' // Ensure the footer takes up full width
  }}>
    <button className='btn btn-success' onClick={handleCloseModal}>DONE</button>
    <button className='btn btn-primary'>ADD NEW EXTENSION</button>
  </div>
</Modal.Footer>

            </Modal>
       <div className='v'><button className='btn btn-success' onClick={NewPolicyUpdate}>UPDATE</button></div>
    </div>
  );
};

export default PolicyUpdate;
