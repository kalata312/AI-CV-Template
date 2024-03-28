package com.example.AI_CV_JAVA.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table
@Entity
public class Experience {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "start_date", nullable = false)
    private String startYear;

    @Column(name = "end_date", nullable = true)
    private String endYear;

    @Column(length = 1000)
    private String description;
}
