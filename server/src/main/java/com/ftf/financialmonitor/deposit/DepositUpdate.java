package com.ftf.financialmonitor.deposit;

import java.math.BigDecimal;

public record DepositUpdate(Long id,
                            BigDecimal money) {
}
