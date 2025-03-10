package com.example.usb_rem_dev_mngmnt.service;

import com.example.usb_rem_dev_mngmnt.model.FileType;
import com.example.usb_rem_dev_mngmnt.repository.FileTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FileTypeService {

    @Autowired
    private FileTypeRepository fileTypeRepository;

    public List<FileType> getAllFileTypes() {
        return fileTypeRepository.findAll();
    }

    public Optional<FileType> getFileTypeById(Long id) {
        return fileTypeRepository.findById(id);
    }

    public FileType createFileType(FileType fileType) {
        if (fileTypeRepository.existsByFiletype(fileType.getFiletype())) {
            throw new IllegalArgumentException("File type already exists");
        }
        return fileTypeRepository.save(fileType);
    }

    public FileType updateFileType(Long id, FileType updatedFileType) {
        return fileTypeRepository.findById(id).map(fileType -> {
            fileType.setFiletype(updatedFileType.getFiletype());
            return fileTypeRepository.save(fileType);
        }).orElseThrow(() -> new RuntimeException("File type not found with id " + id));
    }

    public void deleteFileType(Long id) {
        fileTypeRepository.deleteById(id);
    }
}
