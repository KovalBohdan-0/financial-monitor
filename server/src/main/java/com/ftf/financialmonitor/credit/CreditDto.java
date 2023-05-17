package com.ftf.financialmonitor.credit;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CreditDto {
    private BigDecimal money;
    private BigDecimal percent;
    private LocalDateTime creationTime;
    private LocalDateTime endTime;
}
