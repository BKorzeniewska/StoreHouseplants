package com.houseplant.shop.user.exception;

import com.houseplant.shop.exception.BaseServiceException;
import org.springframework.http.HttpStatus;

public class UserEmailExistsException extends BaseServiceException {

    public UserEmailExistsException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.BAD_REQUEST);
    }
}
