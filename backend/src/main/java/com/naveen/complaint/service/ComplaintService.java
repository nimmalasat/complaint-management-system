package com.naveen.complaint.service;

import com.naveen.complaint.dto.ComplaintDTO;
import com.naveen.complaint.model.Complaint;
import com.naveen.complaint.model.User;
import com.naveen.complaint.repository.ComplaintRepository;
import com.naveen.complaint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    // User submits a complaint
    public ComplaintDTO.ComplaintResponse submitComplaint(ComplaintDTO.CreateRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Complaint complaint = Complaint.builder()
                .category(request.getCategory())
                .description(request.getDescription())
                .status(Complaint.Status.PENDING)
                .user(user)
                .build();

        return ComplaintDTO.ComplaintResponse.from(complaintRepository.save(complaint));
    }

    // User views their own complaints
    public List<ComplaintDTO.ComplaintResponse> getMyComplaints(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return complaintRepository.findByUser(user)
                .stream()
                .map(ComplaintDTO.ComplaintResponse::from)
                .collect(Collectors.toList());
    }

    // Admin views all complaints
    public List<ComplaintDTO.ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAll()
                .stream()
                .map(ComplaintDTO.ComplaintResponse::from)
                .collect(Collectors.toList());
    }

    // Admin updates complaint status
    public ComplaintDTO.ComplaintResponse updateStatus(Long id, ComplaintDTO.UpdateStatusRequest request) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));

        complaint.setStatus(request.getStatus());
        return ComplaintDTO.ComplaintResponse.from(complaintRepository.save(complaint));
    }

    // Admin deletes a complaint
    public void deleteComplaint(Long id) {
        if (!complaintRepository.existsById(id)) {
            throw new RuntimeException("Complaint not found with id: " + id);
        }
        complaintRepository.deleteById(id);
    }
}
