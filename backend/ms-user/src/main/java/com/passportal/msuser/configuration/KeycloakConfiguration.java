package com.passportal.msuser.configuration;

import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfiguration {
    @Value("${passportal.keycloak.serverUrl}")
    private String serverUrl;
    @Value("${passportal.keycloak.realm}")

    private String realm;
    @Value("${passportal.keycloak.clientId}")

    private String clientId;
    @Value("${passportal.keycloak.clientSecret}")

    private String clientSecret;

    public KeycloakConfiguration() {
    }
    @Bean
    public Keycloak setKeycloakClient(){
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .resteasyClient(new ResteasyClientBuilderImpl().connectionPoolSize(10).build())
                .build();
    }
}