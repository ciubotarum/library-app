package com.luv2code.springbootlibrary.config;

import com.luv2code.springbootlibrary.filter.CustomAuthenticationFilter;
import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable CSRF
        http.csrf().disable();

        // Authorize secure endpoints
        http.authorizeRequests(configurer ->
                configurer
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**").permitAll()
                        .requestMatchers("/api/books/secure/**",
                                "/api/reviews/secure/**",
                                "/api/messages/secure/**",
                                "/api/payment/secure/**",
                                "/api/admin/secure/**").authenticated()
        );
        
        // Add the custom filter before the standard authentication filter
        http.addFilterBefore(new CustomAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        // Skip default OAuth2 resource server JWT config:
        // ...existing code removed: .oauth2ResourceServer().jwt() ...

        // Add CORS filters
        http.cors();

        // Content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401's for friendly response
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
