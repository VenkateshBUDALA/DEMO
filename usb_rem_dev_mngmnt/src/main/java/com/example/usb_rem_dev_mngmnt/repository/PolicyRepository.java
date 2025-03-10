package com.example.usb_rem_dev_mngmnt.repository;

import com.example.usb_rem_dev_mngmnt.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    // Custom query methods (if needed) can be added here
	 Policy findByPolicyName(String policyName);
}
