package com.ftf.financialmonitor.login;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/login")
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
        return loginService.login(loginRequest);
    }

}
