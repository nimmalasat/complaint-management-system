package com.naveen.complaint.dto;

import com.naveen.complaint.model.Complaint;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

public class ComplaintDTO {

    @Data
    public static class CreateRequest {
        @NotBlank(message = "Category is required")
        private String category;

        @NotBlank(message = "Description is required")
        private String description;
    }

    @Data
    public static class UpdateStatusRequest {
        private Complaint.Status status;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ComplaintResponse {
        private Long id;
        private String category;
        private String description;
        private String status;
        private LocalDateTime createdAt;
        private String submittedBy;

        public static ComplaintResponse from(Complaint c) {
            ComplaintResponse r = new ComplaintResponse();
            r.setId(c.getId());
            r.setCategory(c.getCategory());
            r.setDescription(c.getDescription());
            r.setStatus(c.getStatus().name());
            r.setCreatedAt(c.getCreatedAt());
            r.setSubmittedBy(c.getUser().getName());
            return r;
        }
    }
}
