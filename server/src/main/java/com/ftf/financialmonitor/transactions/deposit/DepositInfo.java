package com.ftf.financialmonitor.transactions.deposit;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DepositInfo(BigDecimal moneyThatWillGet, int depositsCount, LocalDateTime firstEndingDepositTime) {
}
