package com.ftf.financialmonitor.transactions.income;

import java.math.BigDecimal;

public record IncomeUpdate(Long id,
                           BigDecimal money) {
}
