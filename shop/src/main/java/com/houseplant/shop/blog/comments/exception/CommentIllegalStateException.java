package com.houseplant.shop.blog.comments.exception;


import com.houseplant.shop.exception.BaseServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class CommentIllegalStateException extends BaseServiceException {

    public CommentIllegalStateException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.BAD_REQUEST);
    }
}
