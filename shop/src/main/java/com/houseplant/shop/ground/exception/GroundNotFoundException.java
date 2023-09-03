package com.houseplant.shop.ground.exception;


import com.houseplant.shop.exception.BaseServiceException;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
@Getter
public class GroundNotFoundException extends BaseServiceException {

    public GroundNotFoundException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.NOT_FOUND);
    }
}
