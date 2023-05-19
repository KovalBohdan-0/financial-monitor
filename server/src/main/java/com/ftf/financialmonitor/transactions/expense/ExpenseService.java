package com.ftf.financialmonitor.transactions.expense;

import com.ftf.financialmonitor.customer.Customer;
import com.ftf.financialmonitor.customer.CustomerService;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;

@AllArgsConstructor
@Service
public class ExpenseService {
    private ExpenseRepository expenseRepository;
    private CustomerService customerService;

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
    }

    public List<Expense> getAllExpensesOfCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        return expenseRepository.findAllByCustomerId(customer.getId());
    }

    public BigDecimal getSumOfAllExpensesOfCustomerByMonth(YearMonth yearMonth) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());

        double sum = expenseRepository.findAllByCustomerId(customer.getId()).stream()
                .filter(expense -> {
                    YearMonth expenseYearMonth = YearMonth.from(expense.getCreationTime());
                    return expenseYearMonth.equals(yearMonth);
                })
                .mapToDouble(expense -> expense.getMoney().doubleValue())
                .sum();

        return BigDecimal.valueOf(sum);
    }

    @Transactional
    public void addExpense(ExpenseDto expenseDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        Expense expense = expenseDtoToEntity(expenseDto);
        expense.setCustomerId(customer.getId());
        expenseRepository.save(expense);
    }

    @Transactional
    public void updateExpense(ExpenseUpdate expenseUpdate) {
        Expense expense = getExpenseById(expenseUpdate.id());
        expense.setMoney(expenseUpdate.money());
        expenseRepository.save(expense);
    }

    @Transactional
    public void deleteExpenseById(Long id) {
        expenseRepository.delete(getExpenseById(id));
    }

    @Transactional
    public void deleteAllExpensesOfCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        expenseRepository.deleteAllByCustomerId(customer.getId());
    }

    private Expense expenseDtoToEntity(ExpenseDto expenseDto) {
        return Expense.builder()
                .money(expenseDto.getMoney())
                .description(expenseDto.getDescription())
                .creationTime(expenseDto.getCreationTime())
                .build();
    }
}
