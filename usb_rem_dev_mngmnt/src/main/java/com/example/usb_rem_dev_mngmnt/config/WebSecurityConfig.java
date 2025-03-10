package com.example.usb_rem_dev_mngmnt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(withDefaults -> {})
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(
                        "/api/register",
                        "/api/usb/register",
                        "/api/policy/register",
                        "/api/policy/names",
                        "/api/extensions",
                        "/api/sys/delete/{systemname}",
                        "/api/extensions/search",
                        "/api/delete/{username}",
                        "/api/sys/update/{systemname}",
                        "/api/sys/register",
                        "/api/sys/getSystem",
                        "/api/sys/names",
                        "/api/delete/**",
                        "/api/policies/update/**",
                        "/api/policies/delete/**",
                        "/api/usb/update/**",
                        "/api/usb/delete",
                        "api/usb/names",
                        "/api/update/**",
                        "/api/getdetails",
                        "/api/login",
                        "/api/sys/**",
                        "api/files/filetypes/{role}",
                        "/public/**")
                .permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
