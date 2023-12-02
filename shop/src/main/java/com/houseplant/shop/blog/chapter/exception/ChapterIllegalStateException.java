package com.houseplant.shop.blog.chapter.exception;



import com.houseplant.shop.exception.BaseServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ChapterIllegalStateException extends BaseServiceException {
    public ChapterIllegalStateException(String message, String errorCode, HttpStatus httpStatus) {
        super(message, errorCode, httpStatus);
    }
}
