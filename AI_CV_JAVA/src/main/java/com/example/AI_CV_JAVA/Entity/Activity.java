package com.example.AI_CV_JAVA.Entity;

import com.example.AI_CV_JAVA.Entity.Enum.Type;
import com.example.AI_CV_JAVA.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Activity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String personEmail;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column
    private Type type;

    @Column(nullable = false, updatable = false)
    private Instant createdDate;
}