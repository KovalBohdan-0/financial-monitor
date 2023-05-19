package com.ftf.financialmonitor.credit;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreditUpdate(Long id,
                           BigDecimal money,
                           BigDecimal percent,
                           LocalDateTime endTime) {
}
