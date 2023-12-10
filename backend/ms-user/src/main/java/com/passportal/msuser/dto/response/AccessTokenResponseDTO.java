package com.passportal.msuser.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccessTokenResponseDTO {
    private String accessToken;
    private Long expiresIn;
    private String refreshToken;
    private String scope;
}
