package com.ftf.financialmonitor.credit;

import com.ftf.financialmonitor.customer.Customer;
import com.ftf.financialmonitor.customer.CustomerService;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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

    public List<Credit> getAllCreditsOfCustomer() {
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
    public void updateCredit(CreditUpdate creditUpdate) {
        Credit credit = getCreditById(creditUpdate.id());
        credit.setMoney(creditUpdate.money());
        credit.setPercent(creditUpdate.percent());
        credit.setEndTime(creditUpdate.endTime());
        creditRepository.save(credit);
    }

    @Transactional
    public void deleteCreditById(Long id) {
        creditRepository.delete(getCreditById(id));
    }

    @Transactional
    public void deleteAllCreditsOfCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        creditRepository.deleteAllByCustomerId(customer.getId());
    }

    public CreditInfo getCreditInfo() {
        List<Credit> credits = getAllCreditsOfCustomer();

        if (credits.size() != 0) {
            BigDecimal sumOfCredits = new BigDecimal(0);
            Credit firstCredit = credits.get(0);

            for (Credit credit : credits) {
                if (firstCredit.getEndTime().isAfter(credit.getEndTime())) {
                    firstCredit = credit;
                }

                sumOfCredits = sumOfCredits.add(credit.getMoney().multiply(credit.getPercent()
                        .add(BigDecimal.valueOf(100))
                        .multiply(BigDecimal.valueOf(0.01 * (1 -
                                (double) ChronoUnit.MONTHS.between(credit.getCreationTime(), LocalDateTime.now()) /
                                ChronoUnit.MONTHS.between(credit.getCreationTime(), credit.getEndTime()))))));
            }

            return new CreditInfo(sumOfCredits, credits.size(), firstCredit.getEndTime());
        }

        return new CreditInfo(new BigDecimal(0), 0, LocalDateTime.MIN);
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
