package com.ftf.financialmonitor.income;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/income")
@AllArgsConstructor
public class IncomeController {
    private IncomeService incomeService;

    @GetMapping("/{id}")
    public Income getIncomeById(@PathVariable Long id) {
        return incomeService.getIncomeById(id);
    }

    @GetMapping("/all-by-customer")
    public List<Income> getAllIncomesOfCustomer() {
        return incomeService.getAllIncomesOfCustomer();
    }

    @PostMapping
    public void addIncome(@RequestBody IncomeDto incomeDto) {
        incomeService.addIncome(incomeDto);
    }

    @PutMapping
    public void updateIncome(@RequestBody Income income) {
        incomeService.updateIncome(income);
    }

    @DeleteMapping("/{id}")
    public void deleteIncomeById(@PathVariable Long id) {
        incomeService.deleteIncomeById(id);
    }

    @DeleteMapping("/all-by-customer")
    public void deleteAllIncomesOfCustomer() {
        incomeService.deleteAllIncomesOfCustomer();
    }
}
