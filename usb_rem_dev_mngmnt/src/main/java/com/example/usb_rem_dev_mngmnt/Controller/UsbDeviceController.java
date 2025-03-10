package com.example.usb_rem_dev_mngmnt.Controller;


import com.example.usb_rem_dev_mngmnt.model.UsbDevice;
import com.example.usb_rem_dev_mngmnt.service.UsbDeviceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usb")
public class UsbDeviceController {

    private final UsbDeviceService usbDeviceService;

    // Constructor-based injection for better testability
    @Autowired
    public UsbDeviceController(UsbDeviceService usbDeviceService) {
        this.usbDeviceService = usbDeviceService;
    }

    // Register USB device
    @PostMapping("/register")
    public UsbDevice registerUsbDevice(@RequestBody UsbDevice usbDevice) {
        return usbDeviceService.registerUsbDevice(usbDevice);
    }

    // Get USB device names
    @GetMapping("/names")
    public ResponseEntity<List<String>> getUsbDeviceNames() {
        List<UsbDevice> usbs = usbDeviceService.getAllUsbDevices();
        List<String> usbNames = usbs.stream()
                                    .map(UsbDevice::getUsbName)
                                    .collect(Collectors.toList());
        return ResponseEntity.ok(usbNames);
    }

    // Update USB device
    @PutMapping("/update")
    public UsbDevice updateUsbDevice(
            @RequestParam String usbName,
            @RequestParam String password,
            @RequestBody UsbDevice updatedUsbDevice) {
        return usbDeviceService.updateUsbDevice(usbName, password, updatedUsbDevice);
    }
    
    // Delete USB device
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUsbDevice(@RequestParam String usbName) {
        boolean isDeleted = usbDeviceService.deleteUsbDevice(usbName); // Adjust service logic
        if (isDeleted) {
            return ResponseEntity.ok("USB deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("USB not found");
        }
    }
}
