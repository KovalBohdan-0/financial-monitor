package com.ftf.financialmonitor.deposit;

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
public class DepositService {
    private DepositRepository depositRepository;
    private CustomerService customerService;

    public Deposit getDepositById(Long id) {
        return depositRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deposit not found"));
    }

    public List<Deposit> getAllDeposits() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        return depositRepository.findAllByCustomerId(customer.getId());
    }

    public void addDeposit(DepositDto DepositDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        Deposit deposit = depositDtoToEntity(DepositDto);
        deposit.setCustomerId(customer.getId());
        depositRepository.save(deposit);
    }

    public void updateDeposit(Deposit deposit) {
        depositRepository.save(deposit);
    }

    public void deleteDeposit(Long id) {
        depositRepository.delete(getDepositById(id));
    }

    public void deleteAllDepositsByUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        depositRepository.deleteAllByCustomerId(customer.getId());
    }

    private Deposit depositDtoToEntity(DepositDto depositDto) {
        return Deposit.builder()
                .money(depositDto.getMoney())
                .percent(depositDto.getPercent())
                .creationTime(depositDto.getCreationTime())
                .endTime(depositDto.getEndTime())
                .build();
    }
}
