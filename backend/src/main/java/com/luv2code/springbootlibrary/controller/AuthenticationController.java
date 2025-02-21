package com.luv2code.springbootlibrary.controller;

import com.luv2code.springbootlibrary.entity.User;
import com.luv2code.springbootlibrary.entity.UserType;
import com.luv2code.springbootlibrary.service.UserService;
import com.luv2code.springbootlibrary.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest registerRequest) {
        Optional<User> existingUser = userService.findByUsername(registerRequest.getUsername());
        Optional<User> existingEmail = userService.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (existingEmail.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setEmail(registerRequest.getEmail());
        userService.registerUser(user);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest loginRequest) throws Exception {
        Optional<User> user = userService.findByUsername(loginRequest.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            String token = JwtUtils.generateToken(user.get());
            return new TokenResponse(token);
        }
        throw new Exception("Invalid username or password");
    }

    @PostMapping("/promote")
    public void promoteToAdmin(@RequestParam String username) {
        Optional<User> user = userService.findByUsername(username);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setUserType(UserType.ADMIN);
            userService.registerUser(existingUser);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public static class TokenResponse {
        private String token;

        public TokenResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }

    private static class RegisterRequest {
        private String username;
        private String password;
        private String email;

        public RegisterRequest(String username, String password, String email) {
            this.username = username;
            this.password = password;
            this.email = email;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public String getEmail() {
            return email;
        }
    }

    private static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }
}
