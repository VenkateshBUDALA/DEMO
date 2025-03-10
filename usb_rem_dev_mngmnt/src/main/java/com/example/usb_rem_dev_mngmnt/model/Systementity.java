package com.example.usb_rem_dev_mngmnt.model;

import java.util.Optional;

import jakarta.persistence.*;

@Entity
@Table(name = "systems")  // You can change this to your preferred table name
public class Systementity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    
    @Column(name = "systemname", nullable = false, unique = true)
    private String systemname;
    
    @Column(name = "servicenumber", nullable = false, unique = true)
    private String servicenumber;

    @Column(name = "ipaddress", nullable = false)
    private String ipaddress;

    @Column(name = "macaddress", nullable = false)
    private String macaddress;

   

    @Column(name = "policy")
    private String policy;

    // Default constructor
    public Systementity() {}

    // Constructor with all fields
    public Systementity(String systemname, String servicenumber, String ipaddress, String macaddress,  String policy) {
        this.systemname = systemname;
        this.servicenumber = servicenumber;
        this.ipaddress = ipaddress;
        this.macaddress = macaddress;
       
        this.policy = policy;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSystemname() {
        return systemname;
    }

    public void setSystemname(String systemname) {
        this.systemname = systemname;
    }

    public String getServicenumber() {
        return servicenumber;
    }

    public void setServicenumber(String servicenumber) {
        this.servicenumber = servicenumber;
    }

    public String getIpaddress() {
        return ipaddress;
    }

    public void setIpaddress(String ipaddress) {
        this.ipaddress = ipaddress;
    }

    public String getMacaddress() {
        return macaddress;
    }

    public void setMacaddress(String macaddress) {
        this.macaddress = macaddress;
    }

   

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    @Override
    public String toString() {
        return "Systementity{" +
                "id=" + id +
                ", systemname='" + systemname + '\'' +
                ", servicenumber='" + servicenumber + '\'' +
                ", ipaddress='" + ipaddress + '\'' +
                ", macaddress='" + macaddress + '\'' +
                ", policy='" + policy + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Systementity)) return false;
        Systementity that = (Systementity) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

	
	
	public Optional<Systementity> map(Object object) {
	    return null;
	}

	public Systementity orElse(Object object) {
	    return null;
	}

}
