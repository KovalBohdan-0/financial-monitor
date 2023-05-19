package com.ftf.financialmonitor.transactions.expense;

import java.math.BigDecimal;

public record ExpenseUpdate(Long id,
                            BigDecimal money) {
}
