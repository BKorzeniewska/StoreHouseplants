package com.houseplant.shop.user.service;


import com.houseplant.shop.blog.article.exception.ArticleNotFoundException;
import com.houseplant.shop.user.exception.UserNotFoundException;
import com.houseplant.shop.user.exception.UserRequestException;
import com.houseplant.shop.user.model.dto.ModifyUserRequest;
import com.houseplant.shop.user.model.dto.UserInfoResponse;
import com.houseplant.shop.user.model.entity.User;
import com.houseplant.shop.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<UserInfoResponse> getUserInfo(final String token, final Long userId) {

        User user = null;

        if (token == null && userId == null) {
            throw new UserRequestException("Token or userId must be provided", "USER_NOT_FOUND");
        }

        if ((token != null && token.startsWith("Bearer ")) && userId == null) {
            final String jwt = token.substring(7);
            user = userRepository.findByToken(jwt).orElseThrow(() ->
                    new UserNotFoundException("User with provided token not found", "USER_NOT_FOUND"));
        }

        if (userId != null) {
            user = userRepository.findById(userId).orElseThrow(() ->
                    new UserNotFoundException("User with provided id not found", "USER_NOT_FOUND"));
        }

        if (user == null) {
            throw new UserNotFoundException("User with provided token or id not found", "USER_NOT_FOUND");
        }

        final UserInfoResponse userInfoResponse = getUserInfoResponse(user);

        log.info("User info response: {}", userInfoResponse);
        return new ResponseEntity<>(userInfoResponse, HttpStatus.OK);
    }

    private static UserInfoResponse getUserInfoResponse(User user) {
        final UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstname())
                .lastName(user.getLastname())
                .nickname(user.getNickname())
                .build();
        return userInfoResponse;
    }

    @Override
    public ResponseEntity<UserInfoResponse> modifyUser(final String token, final ModifyUserRequest modifyUserRequest) {

        if (token == null) {
            throw new UserRequestException("Token must be provided", "TOKEN_NOT_FOUND");
        }

        final String bearerToken = token.substring(7);
        final User user = userRepository.findByToken(bearerToken)
                .orElseThrow(() -> new ArticleNotFoundException("User with provided token not found", "USER_NOT_FOUND"));
        if (modifyUserRequest.getNickname() != null) {
            user.setNickname(modifyUserRequest.getNickname());
        }

        if (modifyUserRequest.getFirstname() != null) {
            user.setFirstname(modifyUserRequest.getFirstname());
        }

        if (modifyUserRequest.getLastname() != null) {
            user.setLastname(modifyUserRequest.getLastname());
        }

        userRepository.save(user);
        final User result = userRepository.findByToken(bearerToken)
                .orElseThrow(() -> new ArticleNotFoundException("User with provided token not found", "USER_NOT_FOUND"));


        final UserInfoResponse userInfoResponse = getUserInfoResponse(result);

        log.info("User info response: {}", userInfoResponse);
        return new ResponseEntity<>(userInfoResponse, HttpStatus.OK);
    }

    /**
     * Deletes user by email and ALL other related data
     *
     * @param email
     */
    @Override
    public void deleteUserByEmail(final String email) {
        final User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User with provided email not found", "USER_NOT_FOUND"));
        userRepository.deleteByEmail(email);
        log.info("Deleting user by email: {}, user: {}", email, user);
    }

}
