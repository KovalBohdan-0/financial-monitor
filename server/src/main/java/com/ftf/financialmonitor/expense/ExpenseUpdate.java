package com.ftf.financialmonitor.expense;

import java.math.BigDecimal;

public record ExpenseUpdate(Long id,
                            BigDecimal money) {
}
