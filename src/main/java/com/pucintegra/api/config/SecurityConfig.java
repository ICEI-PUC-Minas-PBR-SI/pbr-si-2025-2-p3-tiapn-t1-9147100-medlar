package com.pucintegra.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desabilita CSRF para permitir POST via JS
            .cors(cors -> cors.configure(http)) // Ativa a config do WebConfig
            .authorizeHttpRequests(auth -> auth
                // Libera TUDO para facilitar o desenvolvimento
                .anyRequest().permitAll() 
            );
        
        return http.build();
    }
}