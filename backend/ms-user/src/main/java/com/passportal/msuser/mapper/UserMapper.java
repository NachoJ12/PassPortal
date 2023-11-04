package com.passportal.msuser.mapper;

import com.passportal.msuser.dto.response.UserResponseDTO;
import com.passportal.msuser.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponseDTO toDto(User user) {
        if (user == null) {
            return null;
        }

        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(user.getId());
        userResponseDTO.setUsername(user.getUsername());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setLastName(user.getLastName());
        userResponseDTO.setRole(user.getRole().getName());

        return userResponseDTO;
    }


}
