import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBarCom from './MyComponents/NavBarCom'; // Import the NavBar component
import SystemCom from './MyComponents/SystemCom';
import PolicyCom from './MyComponents/PolicyCom';
import UsbCom from './MyComponents/UsbCom';
import UserUpdate from './MyComponents/UserUpdate';
import UserReg from './MyComponents/UserReg'; // User Registration component
import UpdateSystem from './MyComponents/UpdateSystem'; // Ensure this is correct
import UsbUpdate from './MyComponents/UsbUpdate';
import PolicyUpdate from './MyComponents/PolicyUpdate';
function App() {
  return (
    <div style={{ background: '#fffaf3', minHeight: '100vh' }}>

     <BrowserRouter>
        <NavBarCom />
         <div style={{ padding: '20px' }}> 
          <Routes>
             <Route path="/" element={<UserReg />} /> 
             <Route path="/SystemCom" element={<SystemCom />} /> 
             <Route path="/UsbCom" element={<UsbCom />} /> 
             <Route path="/UserReg" element={<UserReg />} /> 
             <Route path="/PolicyCom" element={<PolicyCom />} /> 
             <Route path="/user-update/:id" element={<UserUpdate />} />      
            <Route path="/update-system/:systemname" element={<UpdateSystem />}/>
            <Route path="/usb-update/:usbname" element={<UsbUpdate/>}/>
            <Route path="/PolicyUpdate" element={<PolicyUpdate/>}/>

            <Route path="*" element={<h1>Page Not Found</h1>} /> 
           </Routes>
         </div>
       </BrowserRouter>   

     </div> 
  );
}
export default App;
