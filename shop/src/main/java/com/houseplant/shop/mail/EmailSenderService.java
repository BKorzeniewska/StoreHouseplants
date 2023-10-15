package com.houseplant.shop.mail;


import com.houseplant.shop.auth.RegisterRequest;
import com.houseplant.shop.user.model.dto.ResetPasswordRequest;

public interface EmailSenderService {

    void sendRegisterEmail(final RegisterRequest request);

    void sendResetPasswordEmail(final ResetPasswordRequest request);

}
