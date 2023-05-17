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
    public Deposit getDeposit(@PathVariable Long id) {
        return depositService.getDepositById(id);
    }

    @GetMapping
    public List<Deposit> getDeposits() {
        return depositService.getAllDeposits();
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
    public void deleteDeposit(@PathVariable Long id) {
        depositService.deleteDeposit(id);
    }

    @DeleteMapping
    public void deleteAllDeposits() {
        depositService.deleteAllDepositsByUserId();
    }

    @GetMapping("/info")
    public DepositInfo getDepositInfo() {
        return depositService.getDepositInfo();
    }
}
