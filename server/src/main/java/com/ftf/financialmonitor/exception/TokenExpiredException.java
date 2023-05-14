package com.ftf.financialmonitor.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class TokenExpiredException extends RuntimeException{

    private static final Logger LOGGER = LoggerFactory.getLogger(ResourceNotFoundException.class);

    public TokenExpiredException(String message){
        super(message);
        LOGGER.error("Token expired exception with message: {}", message);
    }

}
