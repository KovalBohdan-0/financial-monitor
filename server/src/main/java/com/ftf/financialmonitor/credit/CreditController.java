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
    public Credit getCredit(@PathVariable Long id) {
        return creditService.getCreditById(id);
    }

    @GetMapping
    public List<Credit> getCredits() {
        return creditService.getAllCredits();
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
    public void deleteCredit(@PathVariable Long id) {
        creditService.deleteCredit(id);
    }

    @DeleteMapping
    public void deleteAllCredits() {
        creditService.deleteAllCreditsByUserId();
    }

    @GetMapping("/info")
    public CreditInfo getCreditInfo() {
        return creditService.getCreditInfo();
    }
}
