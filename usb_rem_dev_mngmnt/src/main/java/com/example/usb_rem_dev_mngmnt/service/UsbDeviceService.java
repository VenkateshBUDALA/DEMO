package com.example.usb_rem_dev_mngmnt.service;
import org.springframework.transaction.annotation.Transactional;
import com.example.usb_rem_dev_mngmnt.model.UsbDevice;
import com.example.usb_rem_dev_mngmnt.repository.UsbDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsbDeviceService {

    @Autowired
    private UsbDeviceRepository usbDeviceRepository;

    public UsbDevice registerUsbDevice(UsbDevice usbDevice) {
        return usbDeviceRepository.save(usbDevice); // Save the USB device
    }

    public List<UsbDevice> getAllUsbDevices() {
        return usbDeviceRepository.findAll();
    }

    public UsbDevice updateUsbDevice(String usbName, String password, UsbDevice updatedUsbDevice) {
        Optional<UsbDevice> existingUsb = usbDeviceRepository.findByUsbNameAndPassword(usbName, password);
        if (existingUsb.isPresent()) {
            UsbDevice usbDevice = existingUsb.get();
            usbDevice.setUuid(updatedUsbDevice.getUuid());
            usbDevice.setSerialNumber(updatedUsbDevice.getSerialNumber());
            usbDevice.setPassword(updatedUsbDevice.getPassword());
            return usbDeviceRepository.save(usbDevice); // Update the existing USB device
        }
        return null; // Return null if authentication fails
    }
   
    
    @Transactional
    public boolean deleteUsbDevice(String usbName) {
        if (usbDeviceRepository.existsByUsbName(usbName)) {
            usbDeviceRepository.deleteByUsbName(usbName);
            return true;
        }
        return false; // USB does not exist
    }

}
