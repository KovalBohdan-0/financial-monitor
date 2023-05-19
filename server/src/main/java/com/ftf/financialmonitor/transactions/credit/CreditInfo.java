package com.ftf.financialmonitor.transactions.credit;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreditInfo(BigDecimal moneyToPay, int creditsCount, LocalDateTime firstEndingCreditTime) {
}
