package com.passportal.msuser.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.passportal.msuser.dto.request.LoginRequestDTO;
import com.passportal.msuser.dto.request.UserRequestDTO;
import com.passportal.msuser.dto.response.AccessTokenResponseDTO;
import com.passportal.msuser.dto.response.UserResponseDTO;
import com.passportal.msuser.entity.Role;
import com.passportal.msuser.entity.User;
import com.passportal.msuser.exception.DuplicatedValueException;
import com.passportal.msuser.exception.NotFoundException;
import com.passportal.msuser.mapper.UserMapper;
import com.passportal.msuser.repository.RoleRepository;
import com.passportal.msuser.repository.UserRepository;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final Keycloak keycloak;

    private final KeycloakServiceImpl keycloakServiceImpl;

    private PasswordEncoder passwordEncoder;
    @Autowired
    ObjectMapper mapper;

    private final UserMapper userMapper;
    @Value("${passportal.keycloak.realm}")
    private String keycloakRealmName;

    public UserServiceImpl(UserRepository userRepository,  RoleRepository roleRepository, Keycloak keycloak, KeycloakServiceImpl keycloakServiceImpl, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.keycloak = keycloak;
        this.keycloakServiceImpl = keycloakServiceImpl;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(UserRequestDTO userRequestDTO) throws DuplicatedValueException {
        Optional<User> existUser = userRepository.findByEmail(userRequestDTO.getEmail());
        if(existUser.isPresent()) {
            throw new DuplicatedValueException("This email is already in use.");
        }

        try{
            // Create a new user in Keycloak
            String userKeycloakId = keycloakServiceImpl.createUser(userRequestDTO);

            // Create a new user
            User user = mapper.convertValue(userRequestDTO, User.class);
            Role role = roleRepository.getByName("USER");
            user.setRole(role);
            user.setLastPassReset(LocalDateTime.now());
            user.setEnabled(true);
            user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
            user.setKeycloakId(userKeycloakId);

            // save user in mysql database
            userRepository.save(user);
        } catch (Exception ex){
            throw new RuntimeException(ex.getMessage());
        }
    }

    public UserResponseDTO getById(Long id){
        Optional<User> existUser = userRepository.findById(id);

        UserResponseDTO userResponseDTO = userMapper.toDto(existUser.get());
        return userResponseDTO;
    }

    public UserResponseDTO updateUser(String userKeycloakID, UserRequestDTO userRequestDTO) throws Exception {
        Optional<User> existUser = userRepository.findByKeycloakId(userKeycloakID);
        if(existUser.isEmpty()) {
            throw new NotFoundException("User with id " + userKeycloakID + " not found");
        }

        User userUpdate = existUser.get();
        userUpdate.setUsername(userRequestDTO.getUsername());
        userUpdate.setEmail(userRequestDTO.getEmail());
        userUpdate.setName(userRequestDTO.getName());
        userUpdate.setLastName(userRequestDTO.getLastName());

        if(userRequestDTO.getPassword() != null){
            userUpdate.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        }

        keycloakServiceImpl.updateUser(userKeycloakID, userRequestDTO);
        userRepository.save(userUpdate);

        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(userUpdate.getId());
        userResponseDTO.setUsername(userUpdate.getUsername());
        userResponseDTO.setEmail(userUpdate.getEmail());
        userResponseDTO.setName(userUpdate.getName());
        userResponseDTO.setLastName(userUpdate.getLastName());
        userResponseDTO.setRole(userUpdate.getRole().getName());
        userResponseDTO.setKeycloakId(userUpdate.getKeycloakId());

        return userResponseDTO;
    }

    public void deleteById(Long id) {
        Optional<User> existUserDB = userRepository.findById(id);

        if(existUserDB.isPresent()){
            UserRepresentation userKeycloak =
                    keycloak.realms().realm(keycloakRealmName).users()
                            .searchByUsername(existUserDB.get().getUsername(),true).get(0);

            keycloakServiceImpl.deleteUser(userKeycloak.getId());
            userRepository.deleteById(id);
        }
    }



    public AccessTokenResponseDTO login(LoginRequestDTO loginRequestDTO) throws Exception{
        Optional<User> userExists = userRepository.findByEmail(loginRequestDTO.getEmail());

        // Valid user
        if(userExists.isEmpty()){
            throw new Exception("User not found");
        }
        // to do -- Valid password ¿?

        // works with email and username
        return keycloakServiceImpl.login(loginRequestDTO);
    }

    public void logout(String userIdKeycloak) {
        keycloakServiceImpl.logout(userIdKeycloak);
    }

    public UserResponseDTO getByEmail(String email){
        Optional<User> existUser = userRepository.findByEmail(email);

        UserResponseDTO userResponseDTO = userMapper.toDto(existUser.get());
        return userResponseDTO;
    }
}