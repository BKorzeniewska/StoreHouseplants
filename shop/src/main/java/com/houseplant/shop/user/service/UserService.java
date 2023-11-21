package com.houseplant.shop.user.service;


import com.houseplant.shop.user.model.dto.ModifyUserRequest;
import com.houseplant.shop.user.model.dto.UserInfoResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<UserInfoResponse> getUserInfo(final String token, final Long userId);

    ResponseEntity<UserInfoResponse> modifyUser(final String token, final ModifyUserRequest modifyUserRequest);


    void deleteUserByEmail(final String email);
}
