package com.ftf.financialmonitor.deposit;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/deposit")
@AllArgsConstructor
public class DepositController {
    private DepositService depositService;

    @Operation(summary = "Returns deposit",
            description = "Returns credit of current customer by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found deposit by id",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Deposit.class))}),
            @ApiResponse(responseCode = "404", description = "deposit with this id not found")})
    @GetMapping("/{id}")
    public Deposit getDepositById(@PathVariable Long id) {
        return depositService.getDepositById(id);
    }

    @Operation(summary = "Returns all deposits",
            description = "Returns all deposits of current customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found deposits",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Deposit.class))})})
    @GetMapping("/all-by-customer")
    public List<Deposit> getAllDepositsOfCustomer() {
        return depositService.getAllDepositsOfCustomer();
    }

    @Operation(summary = "Adds new deposit",
            description = "Adds new deposit with end money, percent, end datetime, to current customer")
    @PostMapping
    public void addDeposit(@RequestBody DepositDto depositDto) {
        depositService.addDeposit(depositDto);
    }

    @Operation(summary = "Updates deposit by id",
            description = "Updates deposit with money, percent, end datetime, to current customer")
    @PutMapping
    public void updateDeposit(@RequestBody DepositUpdate depositUpdate) {
        depositService.updateDeposit(depositUpdate);
    }

    @Operation(summary = "Deletes deposit by id")
    @DeleteMapping("/{id}")
    public void deleteDepositById(@PathVariable Long id) {
        depositService.deleteDepositById(id);
    }

    @Operation(summary = "Deletes all deposits of current customer")
    @DeleteMapping("/all-by-customer")
    public void deleteAllDepositsOfCustomer() {
        depositService.deleteAllDepositsOfCustomer();
    }

    @Operation(summary = "Returns deposit info of customer",
            description = "Returns deposit info (Amount of money customer gets for deposits, count, first deposit that will end)")
    @GetMapping("/info")
    public DepositInfo getDepositInfo() {
        return depositService.getDepositInfo();
    }
}
