package com.ftf.financialmonitor.transactions.income;

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
public class IncomeService {
    private IncomeRepository incomeRepository;
    private CustomerService customerService;

    public Income getIncomeById(Long id) {
        return incomeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found"));
    }

    public List<Income> getAllIncomesOfCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        return incomeRepository.findAllByCustomerId(customer.getId());
    }

    public BigDecimal getSumOfAllIncomesOfCustomerByMonth(YearMonth yearMonth) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());

        double sum = incomeRepository.findAllByCustomerId(customer.getId()).stream()
                .filter(income -> {
                    YearMonth incomeYearMonth = YearMonth.from(income.getCreationTime());
                    return incomeYearMonth.equals(yearMonth);
                })
                .mapToDouble(income -> income.getMoney().doubleValue())
                .sum();

        return BigDecimal.valueOf(sum);
    }

    @Transactional
    public void addIncome(IncomeDto incomeDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        Income income = incomeDtoToEntity(incomeDto);
        income.setCustomerId(customer.getId());
        incomeRepository.save(income);
    }

    @Transactional
    public void updateIncome(IncomeUpdate incomeUpdate) {
        Income income = getIncomeById(incomeUpdate.id());
        income.setMoney(incomeUpdate.money());
        incomeRepository.save(income);
    }

    @Transactional
    public void deleteIncomeById(Long id) {
        incomeRepository.delete(getIncomeById(id));
    }

    @Transactional
    public void deleteAllIncomesOfCustomer() {
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
