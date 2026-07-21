package com.naveen.complaint.repository;

import com.naveen.complaint.model.Complaint;
import com.naveen.complaint.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUser(User user);
    List<Complaint> findByStatus(Complaint.Status status);
}
