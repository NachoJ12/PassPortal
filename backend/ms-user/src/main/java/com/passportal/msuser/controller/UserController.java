package com.passportal.msuser.controller;

import com.passportal.msuser.dto.request.LoginRequestDTO;
import com.passportal.msuser.dto.request.UserRequestDTO;
import com.passportal.msuser.dto.response.AccessTokenResponseDTO;
import com.passportal.msuser.dto.response.UserResponseDTO;
import com.passportal.msuser.exception.DuplicatedValueException;
import com.passportal.msuser.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

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

    @PostMapping("/logout")
    public void logout(){
        String userIdKeycloak = SecurityContextHolder.getContext().getAuthentication().getName();

        userService.logout(userIdKeycloak);
    }

    // TO DO: Authorizations to delete user.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.ok("User successfully deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID " + id + " not found");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        try {
            UserResponseDTO userResponseDTO = userService.getById(id);
            return ResponseEntity.ok(userResponseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID " + id + " not found");
        }
    }

}