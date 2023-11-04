package com.passportal.msgateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Value("${jwt-decoder-url}")
    private String jwtDecoderUrl;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain (ServerHttpSecurity http){
        http.cors().and().csrf().disable();
        http
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtDecoder(jwtDecoder())
                        )
                )
                .authorizeExchange()
                .pathMatchers("/users/register").permitAll()
                .pathMatchers("/users/login").permitAll()
                .anyExchange()
                .authenticated()
                .and()
                .oauth2Login()
                .and()
                .logout();
        return http.build();
    }

    @Bean
    public ReactiveJwtDecoder jwtDecoder(){
        return NimbusReactiveJwtDecoder.withJwkSetUri(jwtDecoderUrl).build();
    }

}
