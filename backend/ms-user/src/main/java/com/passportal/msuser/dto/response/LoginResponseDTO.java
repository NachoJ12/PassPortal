package com.passportal.msuser.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private Long userId;
    private String username;

    private String email;
    private String role;
    private String accessToken;
    private Long expiresIn;
    private String refreshToken;
    private String scope;
}