package com.naveen.complaint.controller;

import com.naveen.complaint.dto.ComplaintDTO;
import com.naveen.complaint.service.ComplaintService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "Bearer Auth")
@Tag(name = "Admin", description = "Admin-only complaint management")
public class AdminController {

    private final ComplaintService complaintService;

    @GetMapping("/complaints")
    @Operation(summary = "Get all complaints (Admin only)")
    public ResponseEntity<List<ComplaintDTO.ComplaintResponse>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PutMapping("/complaints/{id}/status")
    @Operation(summary = "Update complaint status (Admin only)")
    public ResponseEntity<ComplaintDTO.ComplaintResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody ComplaintDTO.UpdateStatusRequest request) {
        return ResponseEntity.ok(complaintService.updateStatus(id, request));
    }

    @DeleteMapping("/complaints/{id}")
    @Operation(summary = "Delete a complaint (Admin only)")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.ok("Complaint deleted successfully");
    }
}
