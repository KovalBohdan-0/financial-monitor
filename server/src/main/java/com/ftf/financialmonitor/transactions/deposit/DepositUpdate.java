package com.ftf.financialmonitor.transactions.deposit;

import java.math.BigDecimal;

public record DepositUpdate(Long id,
                            BigDecimal money) {
}
