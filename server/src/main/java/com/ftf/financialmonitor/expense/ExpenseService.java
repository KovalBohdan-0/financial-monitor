package com.ftf.financialmonitor.expense;

import com.ftf.financialmonitor.customer.Customer;
import com.ftf.financialmonitor.customer.CustomerService;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class ExpenseService {
    private ExpenseRepository expenseRepository;
    private CustomerService customerService;

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
    }

    public List<Expense> getAllExpenses() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        return expenseRepository.findAllByCustomerId(customer.getId());
    }

    public void addExpense(Expense expense) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        expense.setCustomerId(customer.getId());
        expenseRepository.save(expense);
    }

    public void updateExpense(Expense expense) {
        expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.delete(getExpenseById(id));
    }

    public void deleteAllExpensesByUserId(Long customerId) {
        expenseRepository.deleteAllByCustomerId(customerId);
    }
}
