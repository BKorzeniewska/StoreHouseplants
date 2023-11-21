package com.houseplant.shop.mail;



import com.houseplant.shop.auth.RegisterRequest;
import com.houseplant.shop.user.model.dto.ResetPasswordRequest;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class EmailSenderMockServiceImpl implements EmailSenderService {
    @Override
    public void sendRegisterEmail(final RegisterRequest request) {
        log.info("Sending email to {}", request.getEmail());
        log.info("Email sent");
    }

    @Override
    public void sendResetPasswordEmail(final ResetPasswordRequest request) {
        log.info("Sending email to {}", request.email());
        log.info("Email sent");
    }
}
