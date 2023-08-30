package com.houseplant.shop.user.exception;


import com.houseplant.shop.exception.BaseServiceException;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends BaseServiceException {

    public UserNotFoundException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.NOT_FOUND);
    }
}

