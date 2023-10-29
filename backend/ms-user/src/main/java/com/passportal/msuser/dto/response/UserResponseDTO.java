package com.passportal.msuser.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDTO {
    private String username;
    private String email;
    private String name;
    private String lastName;
    private String role;
}
