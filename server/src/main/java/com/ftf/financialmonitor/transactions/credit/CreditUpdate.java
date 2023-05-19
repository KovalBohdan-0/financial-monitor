package com.ftf.financialmonitor.transactions.credit;

import java.math.BigDecimal;

public record CreditUpdate(Long id,
                           BigDecimal money) {
}
