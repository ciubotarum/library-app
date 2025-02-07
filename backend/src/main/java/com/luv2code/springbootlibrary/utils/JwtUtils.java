package com.luv2code.springbootlibrary.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.oauth2.jwt.JwtException;

import java.security.Key;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Date;

public class JwtUtils {
    private static final String SECRET_KEY = "your-very-secret-key-must-be-at-least-32-characters";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
    private static final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public static String generateToken(String username) {
        String userType = "admin";
        return Jwts.builder()
                .setSubject(username)
                .claim("userType", userType)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    // Validate JWT token
//    public static boolean validateToken(String token) {
//        try {
//            Jwts.parser().setSigningKey(key).build().parseClaimsJws(token);
//            return true;
//        } catch (JwtException e) {
//            return false;
//        }
//    }

    // Extract username from JWT token
//    public static String extractUsername(String token) {
//        return Jwts.parser()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }

    public static String payloadJWTExtraction(String token, String extraction) {

        token.replace("Bearer", "");

        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));

        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        for (String entry : entries) {
            String[] keyValue = entry.split(":");
            if (keyValue[0].equals(extraction)) {

                int remove = 1;
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                map.put(keyValue[0], keyValue[1]);
            }
        }
        if (map.containsKey(extraction)) {
            return map.get(extraction);
        }

        return null;
    }
}
