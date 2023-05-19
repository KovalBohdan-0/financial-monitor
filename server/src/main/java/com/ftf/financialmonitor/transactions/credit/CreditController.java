package com.ftf.financialmonitor.transactions.credit;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/credit")
@AllArgsConstructor
public class CreditController {
    private CreditService creditService;

    @Operation(summary = "Returns credit",
            description = "Returns credit of current customer by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found credit by id",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Credit.class))}),
            @ApiResponse(responseCode = "404", description = "credit with this id not found")})
    @GetMapping("/{id}")
    public Credit getCreditById(@PathVariable Long id) {
        return creditService.getCreditById(id);
    }

    @Operation(summary = "Returns all credits",
            description = "Returns all credits of current customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found credits",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Credit.class))})})
    @GetMapping("/all-by-customer")
    public List<Credit> getAllCreditsOfCustomer() {
        return creditService.getAllCreditsOfCustomer();
    }

    @Operation(summary = "Adds new credit",
            description = "Adds new credit with money, percent, end datetime, to current customer")
    @PostMapping
    public void addCredit(@RequestBody CreditDto creditDto) {
        creditService.addCredit(creditDto);
    }

    @Operation(summary = "Updates credit by id",
            description = "Updates credit with money to current customer")
    @PutMapping
    public void updateCredit(@RequestBody CreditUpdate creditUpdate) {
        creditService.updateCredit(creditUpdate);
    }

    @Operation(summary = "Deletes credit by id")
    @DeleteMapping("/{id}")
    public void deleteCreditById(@PathVariable Long id) {
        creditService.deleteCreditById(id);
    }

    @Operation(summary = "Deletes all credits of current customer")
    @DeleteMapping("/all-by-customer")
    public void deleteAllCreditsOfCustomer() {
        creditService.deleteAllCreditsOfCustomer();
    }

    @Operation(summary = "Returns credit info of customer",
            description = "Returns credit info (Total amount of money the client has to pay, the number of all active credits, the expiration date of the nearest credit)")
    @GetMapping("/info")
    public CreditInfo getCreditInfo() {
        return creditService.getCreditInfo();
    }
}
