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
}
