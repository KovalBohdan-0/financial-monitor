package com.ftf.financialmonitor.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @PostMapping("/sendEmail")
    public void sendEmailAgain(@RequestBody RegistrationRequest request) {
        registrationService.sendConfirmationEmail(request);
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
