package com.example.usb_rem_dev_mngmnt.service;

import com.example.usb_rem_dev_mngmnt.model.Systementity;
import com.example.usb_rem_dev_mngmnt.repository.SystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SystemService {

    private final SystemRepository systemRepository;

    @Autowired
    public SystemService(SystemRepository systemRepository) {
        this.systemRepository = systemRepository;
    }

    public List<Systementity> getAllSystems() {
        return systemRepository.findAll(); // Fetch all systems from the database
    }
 // Delete a system by systemname
    public boolean deleteSystem(String systemname) {
        Optional<Systementity> systemEntity = systemRepository.findBysystemname(systemname);
        if (systemEntity.isPresent()) { // Check if the entity is present
            systemRepository.delete(systemEntity.get()); // Unwrap and delete the actual entity
            return true; // System deleted successfully
        }
        return false; // System not found
    }

    // Update system details
    public Systementity updateSystem(String systemname, Systementity systemDetails) {
        Optional<Systementity> existingSystem = systemRepository.findBysystemname(systemname);
        if (existingSystem.isPresent()) {
            Systementity systemToUpdate = existingSystem.get();
            systemToUpdate.setSystemname(systemDetails.getSystemname());
            systemToUpdate.setServicenumber(systemDetails.getServicenumber());
            systemToUpdate.setIpaddress(systemDetails.getIpaddress());
            systemToUpdate.setMacaddress(systemDetails.getMacaddress());
            systemToUpdate.setPolicy(systemDetails.getPolicy());

            return systemRepository.save(systemToUpdate); // Save the updated system to the database
        }
        return null; // Or throw a custom exception if system not found
    }
}
