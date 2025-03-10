// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./policy.css";

// const PolicyCom = () => {
//   const [fileTypes, setFileTypes] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [policyNames, setPolicyNames] = useState([]);
//   const [policyName, setPolicyName] = useState("");
//   const [selectedPolicy, setSelectedPolicy] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [policies, setPolicies] = useState([]);
//   const [selectedExtensions, setSelectedExtensions] = useState([]);

//   // Define the state for roles and their respective file extensions
//   const [roles, setRoles] = useState({
//     group: { extensions: [] },
//     owner: { extensions: [] },
//     guest: { extensions: [] },
//   });

//   // Filter policy names based on search term
//   const filteredPolicyNames = policyNames.filter((name) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const policyResponse = await axios.get("http://localhost:8080/api/policy/names");
//         const extensionsResponse = await axios.get("http://localhost:8080/api/extensions");

//         if (policyResponse.status === 200) setPolicyNames(policyResponse.data || []);
//         if (extensionsResponse.status === 200) {
//           setFileTypes(extensionsResponse.data); // Get file types from backend
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to load data.");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleButtonClick = (ext) => {
//     setSelectedExtensions((prevSelected) =>
//       prevSelected.includes(ext)
//         ? prevSelected.filter((item) => item !== ext)
//         : [...prevSelected, ext]
//     );
//   };

//   const handleFileTypeChange = (role, fileTypeName) => {
//     setRoles((prevRoles) => {
//       const updatedRole = prevRoles[role];
//       const updatedExtensions = updatedRole.extensions.includes(fileTypeName)
//         ? updatedRole.extensions.filter((ext) => ext !== fileTypeName)
//         : [...updatedRole.extensions, fileTypeName];

//       return {
//         ...prevRoles,
//         [role]: { ...updatedRole, extensions: updatedExtensions },
//       };
//     });
//   };

//   const openFileTypeModal = (role) => {
//     setSelectedRole(role);
//     setShowModal(true); // Show the modal when "FileType" button is clicked
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleUpdate = () => {
//     alert("Successfully Navigated to Update Page!!");
//     navigate('/PolicyUpdate');
//   };

//   const handleDelete = () => {
//     alert("Successfully Deleted!!");
//     setShowDeleteModal(false);
//   };

//   const openDeleteModal = () => {
//     setShowDeleteModal(true);
//   };

//   return (
//     <div className="card">
//       <h1 className="v">POLICY REGISTRATION</h1>

//       <div className="v">
//         <input
//           type="text"
//           placeholder="Policy Name"
//           value={policyName}
//           onChange={(e) => setPolicyName(e.target.value)}
//           required
//         />
//       </div>

//       {["group", "owner", "guest"].map((role) => (
//         <div key={role}>
//           <label style={{ marginTop: "20px", marginRight: "270px" }}>{role.toUpperCase()}</label>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               gap: "20px",
//               marginTop: "-30px",
//               marginLeft: "200px",
//               alignItems: "center",
//             }}
//           >
//             <select>
//               <option>READ</option>
//               <option>WRITE</option>
//               <option>BOTH</option>
//               <option>DENY</option>
//             </select>
//             <button
//               className="btn btn-secondary"
//               style={{ borderRadius: "15px" }}
//               onClick={() => openFileTypeModal(role)}
//             >
//               FileType
//             </button>
//           </div>
//         </div>
//       ))}

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title style={{ marginLeft: 'auto' }}>SELECT FILE TYPES</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
//             {fileTypes.map(({ name, ext }) => (
//               <button
//                 key={ext}
//                 onClick={() => handleFileTypeChange(selectedRole, ext)}
//                 style={{
//                   padding: "10px",
//                   backgroundColor: roles[selectedRole]?.extensions?.includes(ext)
//                     ? "#4CAF50"
//                     : "#f1f1f1",
//                   color: roles[selectedRole]?.extensions?.includes(ext)
//                     ? "white"
//                     : "black",
//                   border: "1px solid #ddd",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {name}
//               </button>
//             ))}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <div style={{
//             display: 'flex',
//             gap: '10px',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: '20px',
//             width: '100%'
//           }}>
//             <button className='btn btn-success' onClick={handleCloseModal}>DONE</button>
//             <button className='btn btn-primary'>ADD NEW EXTENSION</button>
//           </div>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete the policy "{policyName}"?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}

//       <div>
//         <button
//           style={{ display: "flex", margin: " 20px auto" }}
//           type="button"
//           className="btn btn-success"
//           onClick={() => console.log("Register button clicked")}
//         >
//           REGISTER
//         </button>
//       </div>

//       <div className="search-section" style={{display:'flex',flexDirection:'row',gap:'5px',justifyContent:'center',margin:'10px'}}>
//         <input style={{width:'100px'}}
//           type="text"
//           placeholder="Search Policy"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button className='btn btn-primary' onClick={handleUpdate} style={{ marginLeft: '10px' }}>UPDATE</button>
//         <button className='btn btn-danger' onClick={openDeleteModal} style={{ marginLeft: '10px' }}>DELETE</button>

//       </div>
//       {searchTerm && (           
//        <ol style={{ listStyle: 'none', marginRight: '200px' }}>
//           {filteredPolicyNames.map((name) => (
//             <li
//               key={name}
//               onClick={() => setSelectedPolicy(name)}
//               style={{
//                 cursor: "pointer",
//                 padding: "5px",
//                 backgroundColor: selectedPolicy === name ? "#ddd" : "transparent",
//               }}
//             >
//               {name} 
//             </li>
//           ))}
//         </ol>
//          )}
//     </div>
//   );
// };
// export default PolicyCom;




import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./policy.css";
const PolicyCom = () => {
  const [fileTypes, setFileTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [policyNames, setPolicyNames] = useState([]);
  const [policyName, setPolicyName] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roles, setRoles] = useState({
    group: { extensions: [] },
    owner: { extensions: [] },
    guest: { extensions: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const policyResponse = await axios.get("http://localhost:8080/api/policy/names");
        const extensionsResponse = await axios.get("http://localhost:8080/api/extensions");
        if (policyResponse.status === 200) setPolicyNames(policyResponse.data || []);
        if (extensionsResponse.status === 200) setFileTypes(extensionsResponse.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      }
    };
    fetchData();
  }, []);

  const handleUpdate = () => {
    if (selectedPolicy) {
      alert(`Navigating to update page for ${selectedPolicy}`);
      navigate('/PolicyUpdate', { state: { policyName: selectedPolicy } }); 
    } else {
      setError("Please select a policy to update.");
    }
  };

  const handleDelete = async () => {
    if (selectedPolicy) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/policy/${selectedPolicy}`);
        if (response.status === 200) {
          setSuccess(`Policy "${selectedPolicy}" deleted successfully!`);
          setShowDeleteModal(false);
          setSelectedPolicy(""); 
        } else {
          setError("Failed to delete the policy.");
        }
      } catch (error) {
        console.error("Error deleting policy:", error);
        setError("Failed to delete the policy.");
      }
    } else {
      setError("Please select a policy to delete.");
    }
  };

  const openDeleteModal = () => setShowDeleteModal(true);

  return (
    <div className="card">
      <h1 className="v">POLICY REGISTRATION</h1>
      {/* Other UI elements */}
      <div className="search-section" style={{display:'flex',flexDirection:'row',gap:'5px',justifyContent:'center',margin:'10px'}}>
        <input style={{width:'100px'}}
          type="text"
          placeholder="Search Policy"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='btn btn-primary' onClick={handleUpdate} style={{ marginLeft: '10px' }} disabled={!selectedPolicy}>UPDATE</button>
        <button className='btn btn-danger' onClick={openDeleteModal} style={{ marginLeft: '10px' }} disabled={!selectedPolicy}>DELETE</button>
      </div>
      {searchTerm && (           
        <ol style={{ listStyle: 'none', marginRight: '200px' }}>
          {filteredPolicyNames.map((name) => (
            <li
              key={name}
              onClick={() => setSelectedPolicy(name)}
              style={{
                cursor: "pointer",
                padding: "5px",
                backgroundColor: selectedPolicy === name ? "#ddd" : "transparent",
              }}
            >
              {name} 
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default PolicyCom;

