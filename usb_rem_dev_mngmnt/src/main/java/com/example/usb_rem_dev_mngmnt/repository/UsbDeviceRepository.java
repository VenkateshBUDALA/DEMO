package com.example.usb_rem_dev_mngmnt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.usb_rem_dev_mngmnt.model.UsbDevice;

@Repository
public interface UsbDeviceRepository extends JpaRepository<UsbDevice, Long> {
    // Method to delete by usbName
	 void deleteByUsbName(String usbName);
	 boolean existsByUsbName(String usbName);
    Optional<UsbDevice> findByUsbNameAndPassword(String usbName, String password);
    // Custom method to check if a USB device exists by usbName and password
   
}
