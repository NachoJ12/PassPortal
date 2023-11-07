package com.passportal.msuser.service.impl;

import com.passportal.msuser.dto.request.LoginRequestDTO;
import com.passportal.msuser.dto.request.UserRequestDTO;
import com.passportal.msuser.dto.response.AccessTokenResponseDTO;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.admin.client.token.TokenManager;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.Collections;

@Service
public class KeycloakServiceImpl {

    @Value("${passportal.keycloak.realm}")
    private String realm;

    @Value("${passportal.keycloak.serverUrl}")
    private String serverUrl;

    @Value("${passportal.keycloak.clientId}")
    private String clientId;

    @Value("${passportal.keycloak.clientSecret}")
    private String clientSecret;

    @Autowired
    private Keycloak keycloak;

    public AccessTokenResponseDTO login(LoginRequestDTO loginRequestDTO) throws Exception {
        try{
            Keycloak keycloakClient = Keycloak.getInstance(
                    serverUrl, realm, loginRequestDTO.getEmail(), loginRequestDTO.getPassword(), clientId, clientSecret
            );

            TokenManager tokenManager = keycloakClient.tokenManager();

            AccessTokenResponseDTO accessTokenResponseDTO = new AccessTokenResponseDTO(
                    tokenManager.getAccessTokenString(),
                    tokenManager.getAccessToken().getExpiresIn(),
                    tokenManager.refreshToken().getRefreshToken(),
                    tokenManager.getAccessToken().getScope()
            );

            return accessTokenResponseDTO;

        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public void logout(String userIdKeycloak){
        keycloak.realms().realm(realm).users().get(userIdKeycloak).logout();
    }



    public String createUser(UserRequestDTO userRequestDTO) throws Exception{
            // Create credentials (password)
            CredentialRepresentation passwordCredentials = createPasswordCredentials(userRequestDTO.getPassword());

            UserRepresentation newUser = new UserRepresentation();
            newUser.setUsername(userRequestDTO.getUsername());
            newUser.setFirstName(userRequestDTO.getName());
            newUser.setLastName(userRequestDTO.getLastName());
            newUser.setEmail(userRequestDTO.getEmail());
            newUser.setCredentials(Collections.singletonList(passwordCredentials));
            newUser.setEnabled(true);

            UsersResource usersResource = getInstanceUserResource();

            Response response = usersResource.create(newUser);

            if (response.getStatus() != 201) {
                // conflict
                if (response.getStatus() == 409) {
                    String message = String.format("The username '%s' or email '%s' already exist.", userRequestDTO.getUsername(), userRequestDTO.getEmail());
                    throw new Exception(message);
                }

                throw new RuntimeException("Failed to create user");
            }

            String userId = CreatedResponseUtil.getCreatedId(response);
            return userId;
    }

    public void updateUser(String userKeycloakID, UserRequestDTO userRequestDTO) throws Exception {
        try {
            UserResource userResource = getInstanceUserResource().get(userKeycloakID);
            UserRepresentation userRepresentation = userResource.toRepresentation();

            userRepresentation.setUsername(userRequestDTO.getUsername());
            userRepresentation.setEmail(userRequestDTO.getEmail());
            userRepresentation.setFirstName(userRequestDTO.getName());
            userRepresentation.setLastName(userRequestDTO.getLastName());

            if (userRequestDTO.getPassword() != null) {
                CredentialRepresentation passwordCredentials = createPasswordCredentials(userRequestDTO.getPassword());
                userRepresentation.setCredentials(Collections.singletonList(passwordCredentials));
            }

            getInstanceUserResource().get(userKeycloakID).update(userRepresentation);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public void deleteUser(String userIdKeycloak){
        keycloak.realms().realm(realm).users().delete(userIdKeycloak);
    }

    public UsersResource getInstanceUserResource(){
        return keycloak.realm(realm).users();
    }

    /** check if there is a user with the same name **/
    private boolean userExists(String username) {
        return !keycloak.realms().realm(realm).users().searchByUsername(username,true).isEmpty();
    }

    /** create a credentialRepresentation that allows setting passwords **/
    private static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }
}
