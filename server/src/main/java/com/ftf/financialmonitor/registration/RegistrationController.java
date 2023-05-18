package com.ftf.financialmonitor.registration;

import com.ftf.financialmonitor.login.AuthenticationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @Operation(summary = "Registers customer",
            description = "Register user by firstname, surname, email, password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully registered customer",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AuthenticationResponse.class))})})
    @PostMapping
    public AuthenticationResponse register(@RequestBody RegistrationRequest request, @RequestHeader String host) {
        return new AuthenticationResponse(registrationService.register(request, host));
    }

    @Operation(summary = "Sends email to confirm account")
    @PostMapping("/send-email-again")
    public void sendEmailAgain(@RequestBody RegistrationRequest request, @RequestHeader String host) {
        registrationService.sendConfirmationEmail(request, host);
    }

    @Operation(summary = "Confirms account")
    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
