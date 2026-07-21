package com.naveen.complaint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ComplaintApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ComplaintApiApplication.class, args);
        System.out.println("Complaint Management API is running!");
        System.out.println("Swagger UI: http://localhost:8080/swagger-ui/index.html");
    }
}
