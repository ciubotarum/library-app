package com.luv2code.springbootlibrary.utils;

import com.luv2code.springbootlibrary.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.oauth2.jwt.JwtException;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtils {
    private static final String SECRET_KEY = "your-very-secret-key-must-be-at-least-32-characters";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
    private static SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public static String generateToken(User user) {
//        String userType = "admin";
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("userType", user.getUserType().toString())
                .claim("email", user.getEmail())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public static String getClaim(String token, String claim) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new JwtException("Missing or invalid Authorization header");
        }
        token = token.replace("Bearer ", "");
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get(claim, String.class);
    }

}
