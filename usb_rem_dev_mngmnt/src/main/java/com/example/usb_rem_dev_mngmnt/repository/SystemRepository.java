package com.example.usb_rem_dev_mngmnt.repository;

import com.example.usb_rem_dev_mngmnt.model.Systementity;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemRepository extends JpaRepository<Systementity, Long> {

    // Custom query to fetch only system names
    @Query("SELECT s.systemname FROM Systementity s")
    List<String> findAllsystemnames();
   
    Optional<Systementity> findByServicenumber(String servicenumber); // Updated method name
    Optional<Systementity> findBysystemname(String systemname);



	void deleteBysystemname(System system);

    
}