package com.ftf.financialmonitor.login;

import com.ftf.financialmonitor.customer.CustomerUserDetails;
import com.ftf.financialmonitor.security.jwt.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@AllArgsConstructor
public class LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationResponse login(LoginRequest loginRequest) {
        String jwt;

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));

        UserDetails userDetails = new CustomerUserDetails(loginRequest.email(), loginRequest.password());
        jwt = jwtService.generateJwt(new HashMap<>(), userDetails);

        return new AuthenticationResponse(jwt);
    }
}
