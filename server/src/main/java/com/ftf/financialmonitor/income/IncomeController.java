package com.ftf.financialmonitor.income;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/income")
@AllArgsConstructor
public class IncomeController {
    private IncomeService incomeService;

    @Operation(summary = "Returns income",
        description = "Returns income of current customer by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found income by id",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Income.class))}),
            @ApiResponse(responseCode = "404", description = "income with this id not found")})
    @GetMapping("/{id}")
    public Income getIncomeById(@PathVariable Long id) {
        return incomeService.getIncomeById(id);
    }

    @Operation(summary = "Returns all incomes",
            description = "Returns all incomes of current customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found incomes",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Income.class))})})
    @GetMapping("/all-by-customer")
    public List<Income> getAllIncomesOfCustomer() {
        return incomeService.getAllIncomesOfCustomer();
    }

    @Operation(summary = "Adds new income",
            description = "Adds new income with end money, percent, end datetime, to current customer")
    @PostMapping
    public void addIncome(@RequestBody IncomeDto incomeDto) {
        incomeService.addIncome(incomeDto);
    }

    @Operation(summary = "Updates income by id",
            description = "Updates income with money, percent, end datetime, to current customer")
    @PutMapping
    public void updateIncome(@RequestBody Income income) {
        incomeService.updateIncome(income);
    }

    @Operation(summary = "Deletes income by id")
    @DeleteMapping("/{id}")
    public void deleteIncomeById(@PathVariable Long id) {
        incomeService.deleteIncomeById(id);
    }

    @Operation(summary = "Deletes all incomes of current customer")
    @DeleteMapping("/all-by-customer")
    public void deleteAllIncomesOfCustomer() {
        incomeService.deleteAllIncomesOfCustomer();
    }
}
