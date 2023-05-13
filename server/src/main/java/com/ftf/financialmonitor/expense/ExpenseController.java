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
    public Expense getExpense(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return expenseService.getAllExpenses();
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
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    @DeleteMapping
    public void deleteAllExpenses() {
        expenseService.deleteAllExpensesByUserId();
    }
}
