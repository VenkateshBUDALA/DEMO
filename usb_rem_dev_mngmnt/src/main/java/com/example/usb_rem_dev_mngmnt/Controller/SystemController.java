package com.example.usb_rem_dev_mngmnt.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.example.usb_rem_dev_mngmnt.model.LoginRequest;
import com.example.usb_rem_dev_mngmnt.model.Systementity;
import com.example.usb_rem_dev_mngmnt.model.User;
import com.example.usb_rem_dev_mngmnt.repository.SystemRepository;
import com.example.usb_rem_dev_mngmnt.service.SystemService;

import jakarta.validation.Valid;
import java.util.Optional;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sys")
public class SystemController {

    @Autowired
    private SystemRepository systemRepository;
    private Systementity Systementity;
    private final SystemService systemService;

    @Autowired
    public SystemController(SystemService systemService) {
        this.systemService = systemService;
    }
    // Endpoint to register a new system
    @PostMapping("/register")
    public ResponseEntity<Systementity> registerSystem(@Valid @RequestBody Systementity systementity) {
        System.out.println(systementity.getMacaddress()); // Use getter method
        systemRepository.save(systementity);
        return ResponseEntity.ok(systementity);
    }

    // Handle validation errors and send feedback to frontend
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
    
//    @PostMapping("/getSystem")
//    public ResponseEntity<Systementity> getSystemByName(@RequestBody Systementity systemEntity) {
//        String systemname = systemEntity.getSystemname();
//        System.out.printf("Login attempt for username: %s%n", systemname);
//
//        // Fetch user by username
//        Systementity optionalSystem = systemRepository.findBysystemname(systemname);
//
//        if (optionalSystem != null) {
//            //Systementity sys = optionalSystem.get(); // Safe to call get() now
//            return ResponseEntity.ok(optionalSystem); // Return 200 if found
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if not found
//        }
//    }

    
    
    
    @GetMapping("/{systemname}")
    public ResponseEntity<Systementity> getSystemDetails(@PathVariable String systemname) {
        Systementity system = systemRepository.findBysystemname(systemname).orElse(null);
        
        if (system != null) {
            return ResponseEntity.ok(system); // Return the system details if found
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if not found
        }
    }

    @GetMapping("/systems")
    public ResponseEntity<List<Systementity>> getAllSystems() {
        List<Systementity> systems = systemService.getAllSystems();
        if (systems.isEmpty()) {
            return ResponseEntity.noContent().build(); // If no systems are found
        }
        return ResponseEntity.ok(systems); // Return systems with status 200 OK
    }
    @PostMapping("/getSystem")
    public ResponseEntity<Systementity> getSystemByName(@RequestBody Systementity systemEntity) {
        String systemname = systemEntity.getSystemname();
        System.out.printf("Fetching system for name: %s%n", systemname);

        Optional<Systementity> optionalSystem = systemRepository.findBysystemname(systemname);

        return optionalSystem.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @DeleteMapping("/delete/{systemname}")
    public ResponseEntity<String> deleteSystem(@PathVariable String systemname) {
        Optional<Systementity> systemOpt = systemRepository.findBysystemname(systemname);
        return systemOpt.map(system -> {
            systemRepository.deleteById(system.getId());
            return ResponseEntity.ok("System deleted successfully.");
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("System not found."));
    }


   
 // Update system details
    @PutMapping("/update/{systemname}")
    public ResponseEntity<String> updateSystem(@PathVariable String systemname, @RequestBody Systementity systemDetails) {
        Systementity updatedSystem = systemService.updateSystem(systemname, systemDetails);
        if (updatedSystem != null) {
            return ResponseEntity.ok("System updated successfully!");
        } else {
            return ResponseEntity.status(404).body("System not found.");
        }
    }

    // Endpoint to delete a system by service number
//    @DeleteMapping("/delete/{systemname}")
//    public ResponseEntity<String> deleteSystem(@PathVariable String systemname) {
//    	System.out.printf("Login attempt for username: %s%n", systemname);
//        // Find the system by service number
//        Systementity systemOpt = systemRepository.findBysystemname(systemname); // Adjusted method name
//        System.out.printf("Login attempt for username: %s%n", systemOpt);
//        if (systemOpt != null) {
//            // Delete the system from the database
//            systemRepository.deleteById(systemOpt.getId());
//            return ResponseEntity.ok("System deleted successfully.");
//        } else {
//            return ResponseEntity.status(404).body("System not found.");
//        }
//    }
    
    // Endpoint to fetch all system names
    @GetMapping("/names")
    public ResponseEntity<List<String>> getsystemnames() {
        List<String> systemnames = systemRepository.findAllsystemnames();
        return ResponseEntity.ok(systemnames);
    }
}
