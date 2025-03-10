package com.example.usb_rem_dev_mngmnt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UsbDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usbName;
    private String uuid;
    private String serialNumber;
    private String password;

    // Constructors, getters, and setters
    public UsbDevice() {}

    public UsbDevice(String usbName, String uuid, String serialNumber, String password) {
        this.usbName = usbName;
        this.uuid = uuid;
        this.serialNumber = serialNumber;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsbName() {
        return usbName;
    }

    public void setUsbName(String usbName) {
        this.usbName = usbName;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
