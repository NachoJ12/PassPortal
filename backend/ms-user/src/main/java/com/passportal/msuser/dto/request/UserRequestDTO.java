package com.passportal.msuser.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
    private String username;
    private String email;
    private String name;
    private String lastName;
    private String password;

}
