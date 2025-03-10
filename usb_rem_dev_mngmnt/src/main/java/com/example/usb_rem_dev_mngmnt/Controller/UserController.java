package com.example.usb_rem_dev_mngmnt.Controller;

import com.example.usb_rem_dev_mngmnt.model.User;
import com.example.usb_rem_dev_mngmnt.model.UsernameRequest;
import com.example.usb_rem_dev_mngmnt.model.Credentials;
import com.example.usb_rem_dev_mngmnt.model.LoginRequest;
import com.example.usb_rem_dev_mngmnt.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.usb_rem_dev_mngmnt.repository.UserRepository;

import org.springframework.http.HttpStatus;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCrypt;



@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;  // Inject your UserRepository for DB operations

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; 
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser); // Return the registered user
    }
    @PostMapping("/getdetails")
    public ResponseEntity<User> getUserByUsername(@RequestBody UsernameRequest usernameRequest) {
        System.out.printf("Received request: %s%n", usernameRequest); // Log the whole request as a string

        String username = usernameRequest.getUsername();
        
        System.out.println("Username received from request: " + username);

        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Return 400 if username is missing
        }

        User user = userService.getUserByUsername(username);
        System.out.println("user for verify received from request: " + user);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if user not found
        }
    }
    @DeleteMapping("/delete/{deleteUsername}")
    public ResponseEntity<Void> deleteUser(@PathVariable String deleteUsername, @RequestBody Credentials credentials) {
        System.out.println("Delete request received for username: " + deleteUsername);
        System.out.println("Username received from request: " + credentials.getUsername());
        System.out.println("Password received from request: " + credentials.getPassword());

        boolean isDeleted = userService.deleteUser(credentials.getUsername(), credentials.getPassword());
        if (isDeleted) {
            System.out.println("User deleted successfully.");
            return ResponseEntity.ok().build(); // Return 200 if deletion was successful
        } else {
            System.out.println("User deletion failed. Forbidden access.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Return 403 if deletion failed
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        System.out.printf("abcdf,cdv",updatedUser);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.printf("Login attempt for username: %s%n", loginRequest.getUsername());
        System.out.printf("Login attempt for password: %s%n", loginRequest.getPassword());

        // Fetch user by username
        String s=loginRequest.getUsername();
        System.out.printf("username is stored in s:", s);
        User user = userRepository.findByUsername(s);
        System.out.printf("User retrieved 1234: %s%n", user);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }

        // Log stored hashed password
        System.out.printf("Stored hashed password: %s%n", user.getPassword());

        // Compare raw password from login request with the hashed password from the database
        boolean passwordMatches = BCrypt.checkpw(loginRequest.getPassword(), user.getPassword());
        
        if (passwordMatches) {
            // Password is correct, return user data or token
            return ResponseEntity.ok(user); // Optionally, return a JWT token or user data
        } else {
            // Password is incorrect
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }
}
