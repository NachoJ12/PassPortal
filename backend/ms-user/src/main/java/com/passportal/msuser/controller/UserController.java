package com.passportal.msuser.controller;

import com.passportal.msuser.dto.request.UserRequestDTO;
import com.passportal.msuser.exception.DuplicatedValueException;
import com.passportal.msuser.service.impl.UserServiceImpl;
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

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createUser(@RequestBody UserRequestDTO userRequestDto) throws DuplicatedValueException {
        userService.createUser(userRequestDto);
        return ResponseEntity.ok("User data save successfully");
    }

}