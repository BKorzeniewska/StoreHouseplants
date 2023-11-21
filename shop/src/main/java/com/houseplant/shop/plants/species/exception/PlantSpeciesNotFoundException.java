package com.houseplant.shop.plants.species.exception;


import com.houseplant.shop.exception.BaseServiceException;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
@Getter
public class PlantSpeciesNotFoundException extends BaseServiceException {

    public PlantSpeciesNotFoundException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.NOT_FOUND);
    }
}
