package com.luv2code.springbootlibrary.filter;

import com.luv2code.springbootlibrary.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class CustomAuthenticationFilter extends OncePerRequestFilter {
    Logger logger = LoggerFactory.getLogger(CustomAuthenticationFilter.class);

    // Set matcher to restrict filter to secured endpoints, e.g., any URL under /api/**/secure/**
    private final AntPathRequestMatcher securedMatcher = new AntPathRequestMatcher("/api/**/secure/**");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (!securedMatcher.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return;
        }

        try {
            String sub = JwtUtils.getClaim(header, "sub");
            if (sub == null) {
                throw new RuntimeException("Token extraction failed");
            }
            // Set authenticated user in SecurityContext
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(sub, null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception ex) {
            logger.error("Error validating token", ex);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
