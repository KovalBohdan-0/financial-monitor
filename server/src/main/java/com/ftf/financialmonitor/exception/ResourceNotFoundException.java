package com.ftf.financialmonitor.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

    private static final Logger LOGGER = LoggerFactory.getLogger(ResourceNotFoundException.class);

    public ResourceNotFoundException(String message){
        super(message);
        LOGGER.error("Resource not found exception with message: {}", message);
    }
}
