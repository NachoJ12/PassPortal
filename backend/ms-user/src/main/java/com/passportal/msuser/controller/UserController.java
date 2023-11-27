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

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserRequestDTO userRequestDto) {
        try{
            userService.createUser(userRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("User data save successfully");
        } catch (DuplicatedValueException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register the user: " + e.getMessage());
        }
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
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.ok("User successfully deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID " + id + " not found");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            UserResponseDTO userResponseDTO = userService.getById(id);
            return ResponseEntity.ok(userResponseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID " + id + " not found");
        }
    }

}