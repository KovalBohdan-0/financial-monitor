package com.ftf.financialmonitor.transactions.credit;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CreditDto {
    private BigDecimal money;
    private BigDecimal percent;
    private LocalDateTime creationTime;
    private LocalDateTime endTime;

    public CreditDto(BigDecimal money, BigDecimal percent, LocalDateTime endTime) {
        this.money = money;
        this.percent = percent;
        this.endTime = endTime;
        this.creationTime = LocalDateTime.now();
    }
}
