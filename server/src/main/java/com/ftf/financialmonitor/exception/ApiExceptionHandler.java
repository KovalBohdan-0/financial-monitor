package com.ftf.financialmonitor.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = DuplicateResourceException.class)
    public ResponseEntity<Object> handleApiRequestException(DuplicateResourceException exception, HttpServletRequest request){

        ApiException apiException = new ApiException(
                exception.getMessage(),
                HttpStatus.CONFLICT,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<Object> handleApiRequestException(ResourceNotFoundException exception, HttpServletRequest request){

        ApiException apiException = new ApiException(
                exception.getMessage(),
                HttpStatus.NOT_FOUND,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = RequestValidationException.class)
    public ResponseEntity<Object> handleApiRequestException(RequestValidationException exception, HttpServletRequest request){

        ApiException apiException = new ApiException(
                exception.getMessage(),
                HttpStatus.BAD_REQUEST,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = EmailSendingException.class)
    public ResponseEntity<Object> handleApiRequestException(EmailSendingException exception, HttpServletRequest request){

        ApiException apiException = new ApiException(
                exception.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = EmailAlreadyConfirmedException.class)
    public ResponseEntity<Object> handleApiRequestException(EmailAlreadyConfirmedException exception, HttpServletRequest request){

        ApiException apiException = new ApiException(
                exception.getMessage(),
                HttpStatus.BAD_REQUEST,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = TokenExpiredException.class)
    public ResponseEntity<Object> handleApiRequestException(TokenExpiredException exception, HttpServletRequest request){

        ApiException apiException = new ApiException(
                exception.getMessage(),
                HttpStatus.BAD_REQUEST,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

}
