package com.ftf.financialmonitor.transactions.income;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class IncomeDto {
    private BigDecimal money;
    private String description;
    private LocalDateTime creationTime;

    public IncomeDto(BigDecimal money, String description) {
        this.money = money;
        this.description = description;
        this.creationTime = LocalDateTime.now();
    }
}
