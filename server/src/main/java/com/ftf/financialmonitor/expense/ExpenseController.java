package com.ftf.financialmonitor.expense;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/expense")
@AllArgsConstructor
public class ExpenseController {
    private ExpenseService expenseService;

    @Operation(summary = "Returns expense",
            description = "Returns expense of current customer by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found expense by id",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Expense.class))}),
            @ApiResponse(responseCode = "404", description = "expense with this id not found")})
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    @Operation(summary = "Returns all expenses",
            description = "Returns all expenses of current customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully found expenses",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Expense.class))})})
    @GetMapping("/all-by-customer")
    public List<Expense> getAllExpensesOfCustomer() {
        return expenseService.getAllExpensesOfCustomer();
    }

    @Operation(summary = "Adds new expense",
            description = "Adds new expense with end money, percent, end datetime, to current customer")
    @PostMapping
    public void addExpense(@RequestBody ExpenseDto expenseDto) {
        expenseService.addExpense(expenseDto);
    }

    @Operation(summary = "Updates expense by id",
            description = "Updates expense with money, percent, end datetime, to current customer")
    @PutMapping
    public void updateExpense(@RequestBody Expense expense) {
        expenseService.updateExpense(expense);
    }

    @Operation(summary = "Deletes expense by id")
    @DeleteMapping("/{id}")
    public void deleteExpenseById(@PathVariable Long id) {
        expenseService.deleteExpenseById(id);
    }

    @Operation(summary = "Deletes expense by id")
    @DeleteMapping("/all-by-customer")
    public void deleteAllExpensesOfCustomer() {
        expenseService.deleteAllExpensesOfCustomer();
    }
}
