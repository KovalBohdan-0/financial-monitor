package com.ftf.financialmonitor.income;

import java.math.BigDecimal;

public record IncomeUpdate(Long id,
                           BigDecimal money) {
}
