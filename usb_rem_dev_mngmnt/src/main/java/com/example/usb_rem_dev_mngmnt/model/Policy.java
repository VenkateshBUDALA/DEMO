package com.example.usb_rem_dev_mngmnt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String policyname;
    private String usertype;
    private String permissions;
    private String file_extension;

    // Default constructor
    public Policy() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolicyname() {
        return policyname;
    }

    public void setPolicyname(String policyname) {
        this.policyname = policyname;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public String getPermissions() {
        return permissions;
    }

    public void setPermissions(String permissions) {
        this.permissions = permissions;
    }

    public String getFile_extension() {
        return file_extension;
    }

    public void setFile_extension(String file_extension) {
        this.file_extension = file_extension;
    }

    // Optionally, you can override toString() for a better string representation of the object
    @Override
    public String toString() {
        return "Policy{" +
                "id=" + id +
                ", policyname='" + policyname + '\'' +
                ", usertype='" + usertype + '\'' +
                ", permissions='" + permissions + '\'' +
                ", file_extension='" + file_extension + '\'' +
                '}';
    }
}
