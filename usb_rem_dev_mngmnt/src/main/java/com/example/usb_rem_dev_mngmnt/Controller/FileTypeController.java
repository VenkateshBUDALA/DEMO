package com.example.usb_rem_dev_mngmnt.Controller;

import com.example.usb_rem_dev_mngmnt.model.FileType;
import com.example.usb_rem_dev_mngmnt.service.FileTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileTypeController {

    @Autowired
    private FileTypeService fileTypeService;

    // Get all file types
   
    @GetMapping("/filetypes/{role}")
    public ResponseEntity<List<FileType>> getAllFileTypes() {
    	System.out.println("filetypes called heree");
        List<FileType> fileTypes = fileTypeService.getAllFileTypes();
        return ResponseEntity.ok(fileTypes);
    }

    // Get file type by ID
    @GetMapping("/{id}")
    public ResponseEntity<FileType> getFileTypeById(@PathVariable Long id) {
        return fileTypeService.getFileTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new file type
    @PostMapping
    public ResponseEntity<FileType> createFileType(@RequestBody FileType fileType) {
        try {
            FileType createdFileType = fileTypeService.createFileType(fileType);
            return ResponseEntity.ok(createdFileType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Update an existing file type
    @PutMapping("/{id}")
    public ResponseEntity<FileType> updateFileType(@PathVariable Long id, @RequestBody FileType updatedFileType) {
        try {
            FileType fileType = fileTypeService.updateFileType(id, updatedFileType);
            return ResponseEntity.ok(fileType);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a file type
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFileType(@PathVariable Long id) {
        fileTypeService.deleteFileType(id);
        return ResponseEntity.noContent().build();
    }
}
