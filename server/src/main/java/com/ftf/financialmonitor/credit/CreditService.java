package com.ftf.financialmonitor.credit;

import com.ftf.financialmonitor.customer.Customer;
import com.ftf.financialmonitor.customer.CustomerService;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class CreditService {
    private CreditRepository creditRepository;
    private CustomerService customerService;

    public Credit getCreditById(Long id) {
        return creditRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Credit not found"));
    }

    public List<Credit> getAllCredits() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        return creditRepository.findAllByCustomerId(customer.getId());
    }

    @Transactional
    public void addCredit(CreditDto CreditDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        Credit credit = creditDtoToEntity(CreditDto);
        credit.setCustomerId(customer.getId());
        creditRepository.save(credit);
    }

    @Transactional
    public void updateCredit(Credit credit) {
        creditRepository.save(credit);
    }

    @Transactional
    public void deleteCredit(Long id) {
        creditRepository.delete(getCreditById(id));
    }

    @Transactional
    public void deleteAllCreditsByUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        creditRepository.deleteAllByCustomerId(customer.getId());
    }

    private Credit creditDtoToEntity(CreditDto creditDto) {
        return Credit.builder()
                .money(creditDto.getMoney())
                .percent(creditDto.getPercent())
                .creationTime(creditDto.getCreationTime())
                .endTime(creditDto.getEndTime())
                .build();
    }
}
