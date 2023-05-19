package com.ftf.financialmonitor.deposit;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositUpdate(Long id,
                            BigDecimal money,
                            BigDecimal percent,
                            LocalDateTime endTime) {
}
