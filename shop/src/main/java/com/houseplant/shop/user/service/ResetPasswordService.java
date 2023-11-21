package com.houseplant.shop.user.service;


import com.houseplant.shop.user.model.dto.ResetPasswordRequest;

public interface ResetPasswordService {

    void resetPasswordUserRequest(final String userEmail);

    void resetPassword(final ResetPasswordRequest resetPasswordRequest);

    void deleteExpiredTokens();

}
