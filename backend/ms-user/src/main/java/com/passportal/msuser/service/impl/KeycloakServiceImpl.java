package com.passportal.msuser.service.impl;

import com.passportal.msuser.dto.response.AccessTokenResponseDTO;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.token.TokenManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    public AccessTokenResponseDTO login(String username, String password) throws Exception {
        try{
            Keycloak keycloakClient = Keycloak.getInstance(
                    serverUrl, realm, username, password, clientId, clientSecret
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

}