package com.ftf.financialmonitor.credit;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/credit")
@AllArgsConstructor
public class CreditController {
    private CreditService creditService;

    @GetMapping("/{id}")
    public Credit getCreditById(@PathVariable Long id) {
        return creditService.getCreditById(id);
    }

    @GetMapping("/all-by-customer")
    public List<Credit> getAllCreditsOfCustomer() {
        return creditService.getAllCreditsOfCustomer();
    }

    @PostMapping
    public void addCredit(@RequestBody CreditDto creditDto) {
        creditService.addCredit(creditDto);
    }

    @PutMapping
    public void updateCredit(@RequestBody Credit credit) {
        creditService.updateCredit(credit);
    }

    @DeleteMapping("/{id}")
    public void deleteCreditById(@PathVariable Long id) {
        creditService.deleteCreditById(id);
    }

    @DeleteMapping("/all-by-customer")
    public void deleteAllCreditsOfCustomer() {
        creditService.deleteAllCreditsOfCustomer();
    }

    @GetMapping("/info")
    public CreditInfo getCreditInfo() {
        return creditService.getCreditInfo();
    }

    @GetMapping("/info")
    public CreditInfo getCreditInfo() {
        return creditService.getCreditInfo();
    }
}
