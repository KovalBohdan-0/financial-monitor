package com.ftf.financialmonitor.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class EmailSendingException extends RuntimeException {

    private final static Logger LOGGER = LoggerFactory.getLogger(EmailSendingException.class);

    public EmailSendingException(String message){
        super(message);
        LOGGER.error("Email sending exception with message: {}", message);
    }
}
