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
    public Income getIncome(@PathVariable Long id) {
        return incomeService.getIncomeById(id);
    }

    @GetMapping
    public List<Income> getIncomes() {
        return incomeService.getAllIncomes();
    }

    @PostMapping
    public void addIncomes(@RequestBody IncomeDto incomeDto) {
        incomeService.addIncome(incomeDto);
    }

    @PutMapping
    public void updateIncome(@RequestBody Income income) {
        incomeService.updateIncome(income);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
    }

    @DeleteMapping
    public void deleteAllIncomes() {
        incomeService.deleteAllIncomesByUserId();
    }
}
