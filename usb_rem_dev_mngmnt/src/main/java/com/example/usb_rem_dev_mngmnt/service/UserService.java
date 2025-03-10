package com.example.usb_rem_dev_mngmnt.service;

import com.example.usb_rem_dev_mngmnt.model.User;
import com.example.usb_rem_dev_mngmnt.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.usb_rem_dev_mngmnt.service.CustomException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // Injecting UserRepository to handle DB operations

    private final BCryptPasswordEncoder passwordEncoder; // Password encoder for hashing passwords

    // Constructor injection for better testability
    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user by encoding their password and saving them to the database.
     * 
     * @param user the User object containing the registration details
     * @return the saved User object
     */
    public User registerUser(User user) {
    	String username=user.getUsername();
    	
    	boolean userExists = userRepository.existsByUsername(username);
    	if (userExists) {
    	    throw new CustomException("Username already exists.");
    	}

        // Encrypt the password before saving the user
       
        return userRepository.save(user); // Save the user to the database
    }
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null); // Fetch user or return null if not found
    }

    public User updateUser(Long id, User user) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setUserid(user.getUserid());
            existingUser.setDepartment(user.getDepartment());
            existingUser.setUnit(user.getUnit());
            existingUser.setPassword(user.getPassword());
            return userRepository.save(existingUser); // Save updated user
        }
        return null; // Return null if user not found
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username); // Assumes a method exists in UserRepository
    }

    public boolean deleteUser(String username, String password) {
        // Example implementation
        User user = userRepository.findByUsername(username);
        System.out.println("Password received from request: service1" + user.getPassword());
        if (user != null && user.getUsername().equals(username) && passwordMatches(password, user.getPassword())) {
            userRepository.delete(user);
            return true;
        }
        return false; // Or throw an exception
    }

    private boolean passwordMatches(String rawPassword, String encodedPassword) {
        // Log the received raw password
        System.out.println("Received raw password from request: " + rawPassword);

        // Log the received encoded password
        System.out.println("Received encoded password from request: " + encodedPassword);
        
        // Initialize the BCryptPasswordEncoder
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("Initialized BCryptPasswordEncoder.");

        // Check if the raw password matches the encoded password
        boolean isMatch = encoder.matches(rawPassword, encodedPassword);

        // Log the result of the password match check
        if (isMatch) {
            System.out.println("Password match successful.");
        } else {
            System.out.println("Password match failed.");
        }

        return isMatch; // Return the result
    }


//    
//    public User updateUser(Long id, User updatedUser) {
//        return userRepository.findById(id)
//                .map(user -> {
//                    user.setUsername(updatedUser.getUsername());
//                    user.setPassword(updatedUser.getPassword());
//                    user.setDepartment(updatedUser.getDepartment());
//                    user.setUnit(updatedUser.getUnit());
//                    return userRepository.save(user);
//                })
//                .orElse(null);
//    }
    
}
