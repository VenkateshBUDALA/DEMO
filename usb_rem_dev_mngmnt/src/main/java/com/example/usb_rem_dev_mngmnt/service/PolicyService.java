package com.example.usb_rem_dev_mngmnt.service;

import com.example.usb_rem_dev_mngmnt.model.Policy;
import com.example.usb_rem_dev_mngmnt.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Optional<Policy> getPolicyById(Long id) {
        return policyRepository.findById(id);
    }

    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public Policy updatePolicy(Long id, Policy updatedPolicy) {
        return policyRepository.findById(id).map(policy -> {
            policy.setPolicyname(updatedPolicy.getPolicyname());
            policy.setUsertype(updatedPolicy.getUsertype());
            policy.setPermissions(updatedPolicy.getPermissions());
            policy.setFile_extension(updatedPolicy.getFile_extension());
            return policyRepository.save(policy);
        }).orElseThrow(() -> new RuntimeException("Policy not found with id " + id));
    }

    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }
}
