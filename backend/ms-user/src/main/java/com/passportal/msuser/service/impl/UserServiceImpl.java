package com.passportal.msuser.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.passportal.msuser.dto.request.UserRequestDTO;
import com.passportal.msuser.dto.response.AccessTokenResponseDTO;
import com.passportal.msuser.dto.response.UserResponseDTO;
import com.passportal.msuser.entity.Role;
import com.passportal.msuser.entity.User;
import com.passportal.msuser.exception.DuplicatedValueException;
import com.passportal.msuser.mapper.UserMapper;
import com.passportal.msuser.repository.RoleRepository;
import com.passportal.msuser.repository.UserRepository;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserServiceImpl {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final Keycloak keycloak;

    private final KeycloakServiceImpl keycloakServiceImpl;
    @Autowired
    ObjectMapper mapper;

    private final UserMapper userMapper;
    @Value("${passportal.keycloak.realm}")
    private String keycloakRealmName;

    public UserServiceImpl(UserRepository userRepository,  RoleRepository roleRepository, Keycloak keycloak, KeycloakServiceImpl keycloakServiceImpl, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.keycloak = keycloak;
        this.keycloakServiceImpl = keycloakServiceImpl;
        this.userMapper = userMapper;
    }

    public UsersResource getInstanceUserResource(){
        return keycloak.realm(keycloakRealmName).users();
    }

    public void createUser(UserRequestDTO userRequestDto) throws DuplicatedValueException {
        Optional<User> existUser = userRepository.findByEmail(userRequestDto.getEmail());
        if(existUser.isPresent()) {
            throw new DuplicatedValueException("This email is already in use.");
        }

        // Create credentials (password)
        CredentialRepresentation passwordCredentials = createPasswordCredentials(userRequestDto.getPassword());

        try{
            // Create a new user in Keycloak
            if (!userExists(userRequestDto.getUsername())) {
                UserRepresentation newUser = new UserRepresentation();
                newUser.setUsername(userRequestDto.getUsername());
                newUser.setFirstName(userRequestDto.getName());
                newUser.setLastName(userRequestDto.getLastName());
                newUser.setEmail(userRequestDto.getEmail());
                newUser.setCredentials(Collections.singletonList(passwordCredentials));
                newUser.setEnabled(true);

                UsersResource usersResource = getInstanceUserResource();
                usersResource.create(newUser);

                String userId = usersResource.searchByUsername(userRequestDto.getUsername(), true).get(0).getId();

                System.out.println("\nUser create successfuly");
                System.out.println("UserID: " + userId + " - username: " + userRequestDto.getUsername());
            } else {
                System.out.println("The user '" + userRequestDto.getUsername() + "' already exist.");
            }

            // Create a new user
            User user = mapper.convertValue(userRequestDto, User.class);
            Role role = roleRepository.getByName("USER");
            user.setRole(role);
            user.setLastPassReset(LocalDateTime.now());
            user.setEnabled(true);
            user.setPassword("password"); // to do encrypt

            // save user in mysql database
            userRepository.save(user);
        } catch (Exception ex){
            throw new RuntimeException("ERROR: User creation failed. " + ex);

        }
    }

    public UserResponseDTO getById(Long id){
        Optional<User> existUser = userRepository.findById(id);

        UserResponseDTO userResponseDTO = userMapper.toDto(existUser.get());
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

    /** check if there is a user with the same name **/
    private boolean userExists(String username) {
        return !keycloak.realms().realm(keycloakRealmName).users().searchByUsername(username,true).isEmpty();
    }

    /** create a credentialRepresentation that allows setting passwords **/
    private static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }

    public AccessTokenResponseDTO login(String email, String password) throws Exception{
        Optional<User> userExists = userRepository.findByEmail(email);

        // Valid user
        if(userExists.isEmpty()){
            throw new Exception("User not found");
        }
        // to do -- Valid password ¿?

        // also works with email
        return keycloakServiceImpl.login(userExists.get().getUsername(), password);
    }

    public void logout(String userIdKeycloak) {
        keycloakServiceImpl.logout(userIdKeycloak);
    }

}