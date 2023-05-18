package com.ftf.financialmonitor.login;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/login")
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @Operation(summary = "Logins user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully logging",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AuthenticationResponse.class))}),
            @ApiResponse(responseCode = "404", description = "user with this email and password not found")})
    @PostMapping
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
        return loginService.login(loginRequest);
    }

}
