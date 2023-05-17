package com.ftf.financialmonitor.expense;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/expense")
@AllArgsConstructor
public class ExpenseController {
    private ExpenseService expenseService;

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    @GetMapping("/all-by-customer")
    public List<Expense> getAllExpensesOfCustomer() {
        return expenseService.getAllExpensesOfCustomer();
    }

    @PostMapping
    public void addExpense(@RequestBody ExpenseDto expenseDto) {
        expenseService.addExpense(expenseDto);
    }

    @PutMapping
    public void updateExpense(@RequestBody Expense expense) {
        expenseService.updateExpense(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpenseById(@PathVariable Long id) {
        expenseService.deleteExpenseById(id);
    }

    @DeleteMapping("/all-by-customer")
    public void deleteAllExpensesOfCustomer() {
        expenseService.deleteAllExpensesOfCustomer();
    }
}
