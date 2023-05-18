package com.ftf.financialmonitor.customer;

import com.ftf.financialmonitor.deposit.Deposit;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Operation(summary = "Returns customer by id",
            description = "Returns currently authenticated customer by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found customer",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Deposit.class))})})
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id){
        log.info("fetching customer with id {}", id);
        return  customerService.getCustomerById(id);
    }

    @Operation(summary = "Returns customer by email",
            description = "Returns currently authenticated customer by email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found customer",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Deposit.class))})})
    @GetMapping("/{email}")
    public Customer getCustomerByEmail(@PathVariable String email){
        log.info("fetching customer with id {}", email);
        return  customerService.getCustomerByEmail(email);
    }

    @Operation(summary = "Returns customer",
            description = "Returns currently authenticated customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found customer",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Deposit.class))})})
    @GetMapping
    public CustomerDto getCurrentCustomer() {
        return customerService.getCurrentCustomer();
    }

}

