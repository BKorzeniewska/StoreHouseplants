package com.houseplant.shop.auth;

import com.houseplant.shop.config.JwtService;
import com.houseplant.shop.token.Token;
import com.houseplant.shop.token.TokenRepository;
import com.houseplant.shop.token.TokenType;
import com.houseplant.shop.user.exception.UserEmailExistsException;
import com.houseplant.shop.user.exception.UserNotFoundException;
import com.houseplant.shop.user.exception.UserRequestException;
import com.houseplant.shop.user.model.entity.Role;
import com.houseplant.shop.user.model.entity.User;
import com.houseplant.shop.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {

        if (!isUserRequestValid(request)) {
            throw new UserRequestException(
                    "User request is not valid, all fields have to be filled",
                    "USER_REQUEST_NOT_VALID");
        }

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserEmailExistsException(
                    "User with provided email already exists",
                    "USER_EMAIL_EXISTS");
        }

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .role(Role.USER)
                .build();

        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);

        /*Runnable sendingEmail = () -> {
            emailSenderService.sendRegisterEmail(request);
        };
        new Thread(sendingEmail).start();*/


        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(savedUser.getRole())
                .userId(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .build();
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        final User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User with provided email does not exists", "USER_DOES_NOT_EXISTS"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        final String jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .userId(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private boolean isUserRequestValid(RegisterRequest request) {
        return (request.getFirstname() != null && !request.getFirstname().trim().isBlank())
                && (request.getLastname() != null && !request.getLastname().trim().isBlank())
                && (request.getEmail() != null && !request.getEmail().trim().isBlank())
                && (request.getPassword() != null && !request.getEmail().trim().isBlank())
                && (request.getNickname() != null && !request.getNickname().trim().isBlank());
    }
}