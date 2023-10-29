package com.passportal.msuser.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JWTConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    private final JwtGrantedAuthoritiesConverter defaultGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    private static Collection<? extends GrantedAuthority> extractResourceRoles(final Jwt jwt) throws JsonProcessingException {
        Set<GrantedAuthority> resourcesRoles = new HashSet();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        resourcesRoles.addAll(extractRoles("resource_access", objectMapper.readTree(objectMapper.writeValueAsString(jwt)).get("claims")));
        resourcesRoles.addAll(extractRolesRealmAccess("realm_access", objectMapper.readTree(objectMapper.writeValueAsString(jwt)).get("claims")));

        return resourcesRoles;
    }

    private static List<GrantedAuthority> extractRoles(String route, JsonNode jwt) {
        Set<String> rolesWithPrefix = new HashSet<>();

        jwt.path(route)
                .elements()
                .forEachRemaining(e -> e.path("roles")
                        .elements()
                        .forEachRemaining(r -> rolesWithPrefix.add("ROLE_" + r.asText())));

        final List<GrantedAuthority> authorityList =
                AuthorityUtils.createAuthorityList(rolesWithPrefix.toArray(new String[0]));

        return authorityList;
    }

    private static List<GrantedAuthority> extractRolesRealmAccess(String route, JsonNode jwt) {
        Set<String> rolesWithPrefix = new HashSet<>();

        jwt.path(route)
                .path("roles")
                .elements()
                .forEachRemaining(r -> rolesWithPrefix.add("ROLE_" + r.asText()));

        final List<GrantedAuthority> authorityList =
                AuthorityUtils.createAuthorityList(rolesWithPrefix.toArray(new String[0]));

        return authorityList;
    }
    public JWTConverter() {
    }

    public AbstractAuthenticationToken convert(final Jwt source) {
        Collection<GrantedAuthority> authorities = null;
        try {
            authorities = this.getGrantedAuthorities(source);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new JwtAuthenticationToken(source, authorities);
    }

    public Collection<GrantedAuthority> getGrantedAuthorities(Jwt source) throws JsonProcessingException {
        return (Collection) Stream.concat(this.defaultGrantedAuthoritiesConverter.convert(source).stream(), extractResourceRoles(source).stream()).collect(Collectors.toSet());
    }
}
