package com.houseplant.shop.user.exception;


import com.houseplant.shop.exception.BaseServiceException;
import org.springframework.http.HttpStatus;

public class ResetTokenNotFound extends BaseServiceException {

    public ResetTokenNotFound(String message, String errorCode) {
        super(message, errorCode, HttpStatus.NOT_FOUND);
    }
}
