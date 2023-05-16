package com.ftf.financialmonitor.deposit;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class DepositDto {
    private BigDecimal money;
    private BigDecimal percent;
    private LocalDateTime creationTime;
    private LocalDateTime endTime;

    public DepositDto(BigDecimal money, BigDecimal percent, LocalDateTime endTime) {
        this.money = money;
        this.percent = percent;
        this.endTime = endTime;
        this.creationTime = LocalDateTime.now();
    }
}
