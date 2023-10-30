package com.passportal.msuser.controller;

import com.passportal.msuser.dto.request.LoginRequestDTO;
import com.passportal.msuser.dto.request.UserRequestDTO;
import com.passportal.msuser.dto.response.AccessTokenResponseDTO;
import com.passportal.msuser.dto.response.UserResponseDTO;
import com.passportal.msuser.exception.DuplicatedValueException;
import com.passportal.msuser.service.impl.UserServiceImpl;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @Value("${passportal.keycloak.realm}")
    private String realmName;

    @Autowired
    private Keycloak keycloak;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createUser(@RequestBody UserRequestDTO userRequestDto) throws DuplicatedValueException {
        userService.createUser(userRequestDto);
        return ResponseEntity.ok("User data save successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginRequestDTO loginRequestDTO) throws Exception {
        AccessTokenResponseDTO credentials = userService.login(loginRequestDTO.getEmail(), loginRequestDTO.getPassword());

        if (credentials.getAccessToken().isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(credentials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        UserRepresentation user = keycloak.realm("PassPortal").users().get(id).toRepresentation();

        UserResponseDTO userResponseDTO = new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), user.getFirstName(), "USER");
        return ResponseEntity.ok(userResponseDTO);
    }

}