package com.example.usb_rem_dev_mngmnt.repository;

import com.example.usb_rem_dev_mngmnt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // No body needed, just declare the method
    User findByUsername(String username);
    User getUserByUsername(String username);
    boolean existsByUsername(String username);    
}
