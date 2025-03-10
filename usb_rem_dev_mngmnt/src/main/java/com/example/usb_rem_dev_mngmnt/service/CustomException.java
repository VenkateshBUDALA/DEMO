package com.example.usb_rem_dev_mngmnt.service;

public class CustomException extends RuntimeException {
    
    // Default constructor
    public CustomException() {
        super();
    }

    // Constructor that accepts a custom message
    public CustomException(String message) {
        super(message);
    }

    // Constructor that accepts a custom message and a cause (another exception)
    public CustomException(String message, Throwable cause) {
        super(message, cause);
    }
}
