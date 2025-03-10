package com.example.usb_rem_dev_mngmnt.repository;

import com.example.usb_rem_dev_mngmnt.model.FileType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileTypeRepository extends JpaRepository<FileType, Long> {
    // You can add custom query methods if needed, for example:
    boolean existsByFiletype(String filetype);
}
