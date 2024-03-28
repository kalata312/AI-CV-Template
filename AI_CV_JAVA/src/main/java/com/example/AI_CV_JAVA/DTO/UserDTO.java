package com.example.AI_CV_JAVA.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @Size(max = 50, message = "First name cannot be more than 100 characters")
    private String firstname;

    @Size(max = 50, message = "First name cannot be more than 100 characters")
    private String lastname;

    @Email(message = "Email is not valid", regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
    @Size(max = 100, message = "Email cannot be more than 100 characters")
    @NotNull(message = "Email cannot not be null")
    private String email;

    private String pictureUrl;
}
