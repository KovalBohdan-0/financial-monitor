package com.ftf.financialmonitor.deposit;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/deposit")
@AllArgsConstructor
public class DepositController {
    private DepositService depositService;

    @GetMapping("/{id}")
    public Deposit getDepositById(@PathVariable Long id) {
        return depositService.getDepositById(id);
    }

    @GetMapping("/all-by-customer")
    public List<Deposit> getAllDepositsOfCustomer() {
        return depositService.getAllDepositsOfCustomer();
    }

    @PostMapping
    public void addDeposit(@RequestBody DepositDto depositDto) {
        depositService.addDeposit(depositDto);
    }

    @PutMapping
    public void updateDeposit(@RequestBody Deposit deposit) {
        depositService.updateDeposit(deposit);
    }

    @DeleteMapping("/{id}")
    public void deleteDepositById(@PathVariable Long id) {
        depositService.deleteDepositById(id);
    }

    @DeleteMapping("/all-by-customer")
    public void deleteAllDepositsOfCustomer() {
        depositService.deleteAllDepositsOfCustomer();
    }
}
