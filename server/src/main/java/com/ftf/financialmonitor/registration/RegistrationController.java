package com.ftf.financialmonitor.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request, @RequestHeader String host) {
        return registrationService.register(request, host);
    }

    @PostMapping("/send-email-again")
    public void sendEmailAgain(@RequestBody RegistrationRequest request, @RequestHeader String host) {
        registrationService.sendConfirmationEmail(request, host);
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
