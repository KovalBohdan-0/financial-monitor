package com.ftf.financialmonitor.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class RequestValidationException extends RuntimeException{

    private final static Logger LOGGER = LoggerFactory.getLogger(RequestValidationException.class);

    public RequestValidationException(String message) {
        super(message);
        LOGGER.error("Request validation exception with message: {}", message);
    }
}
