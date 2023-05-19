package com.ftf.financialmonitor.transactions.expense;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ExpenseDto {
    private BigDecimal money;
    private String description;
    private LocalDateTime creationTime;

    public ExpenseDto(BigDecimal money, String description) {
        this.money = money;
        this.description = description;
        this.creationTime = LocalDateTime.now();
    }
}
