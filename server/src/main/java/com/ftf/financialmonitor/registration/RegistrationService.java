package com.ftf.financialmonitor.registration;

import com.ftf.financialmonitor.customer.CustomerService;
import com.ftf.financialmonitor.customer.CustomerUserDetails;
import com.ftf.financialmonitor.email.EmailSender;
import com.ftf.financialmonitor.exception.EmailAlreadyConfirmedException;
import com.ftf.financialmonitor.exception.RequestValidationException;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import com.ftf.financialmonitor.exception.TokenExpiredException;
import com.ftf.financialmonitor.registration.token.ConfirmationToken;
import com.ftf.financialmonitor.registration.token.ConfirmationTokenService;
import com.ftf.financialmonitor.security.jwt.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final CustomerService customerService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final JwtService jwtService;

    @Transactional
    public String register(RegistrationRequest request) {
        if(!emailValidator.test(request.email())){
            throw new RequestValidationException("email \"%s\" not valid".formatted(request.email()));
        }

        customerService.signUpCustomer(request);
        sendConfirmationEmail(request);
        UserDetails userDetails = new CustomerUserDetails(request.email(), request.password());
        return jwtService.generateJwt(new HashMap<>(), userDetails);
    }

    public void sendConfirmationEmail(RegistrationRequest request){
        String token = confirmationTokenService.generateAndSaveTokenForCustomer(request);
        String link = "http://localhost:8090/api/v1/registration/confirm?token=" + token;
        emailSender.send(request.email(), emailSender.buildEmail(request.firstName(), link));
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new EmailAlreadyConfirmedException("email already confirmed");
        }

        LocalDateTime expiresAt = confirmationToken.getExpiresAt();
        if (expiresAt.isBefore(LocalDateTime.now())){
            throw new TokenExpiredException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        customerService.enableCustomer(confirmationToken.getCustomer().getEmail());

        return "confirmed";
    }
}
