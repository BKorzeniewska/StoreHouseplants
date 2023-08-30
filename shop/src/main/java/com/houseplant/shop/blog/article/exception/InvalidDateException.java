package com.houseplant.shop.blog.article.exception;

import com.houseplant.shop.exception.BaseServiceException;
import org.springframework.http.HttpStatus;

public class InvalidDateException extends BaseServiceException {
    public InvalidDateException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.NOT_ACCEPTABLE);
    }
}
