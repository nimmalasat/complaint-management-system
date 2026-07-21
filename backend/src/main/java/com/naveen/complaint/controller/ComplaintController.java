package com.naveen.complaint.controller;

import com.naveen.complaint.dto.ComplaintDTO;
import com.naveen.complaint.service.ComplaintService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Auth")
@Tag(name = "Complaints", description = "User complaint operations")
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping
    @Operation(summary = "Submit a new complaint")
    public ResponseEntity<ComplaintDTO.ComplaintResponse> submit(
            @Valid @RequestBody ComplaintDTO.CreateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(complaintService.submitComplaint(request, userDetails.getUsername()));
    }

    @GetMapping("/my")
    @Operation(summary = "Get my complaints")
    public ResponseEntity<List<ComplaintDTO.ComplaintResponse>> getMyComplaints(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(complaintService.getMyComplaints(userDetails.getUsername()));
    }
}
