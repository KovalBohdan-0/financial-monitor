package com.ftf.financialmonitor.credit;

import java.math.BigDecimal;

public record CreditUpdate(Long id,
                           BigDecimal money) {
}
