package com.ftf.financialmonitor.income;

import com.ftf.financialmonitor.customer.Customer;
import com.ftf.financialmonitor.customer.CustomerService;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class IncomeService {
    private IncomeRepository incomeRepository;
    private CustomerService customerService;

    public Income getIncomeById(Long id) {
        return incomeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found"));
    }

    public List<Income> getAllIncomes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        return incomeRepository.findAllByCustomerId(customer.getId());
    }

    public void addIncome(IncomeDto incomeDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        Income income = incomeDtoToEntity(incomeDto);
        income.setCustomerId(customer.getId());
        incomeRepository.save(income);
    }

    public void updateIncome(Income income) {
        incomeRepository.save(income);
    }

    public void deleteIncome(Long id) {
        incomeRepository.delete(getIncomeById(id));
    }

    public void deleteAllIncomesByUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        incomeRepository.deleteAllByCustomerId(customer.getId());
    }

    private Income incomeDtoToEntity(IncomeDto incomeDto) {
        return Income.builder()
                .money(incomeDto.getMoney())
                .description(incomeDto.getDescription())
                .creationTime(incomeDto.getCreationTime())
                .build();
    }
}
