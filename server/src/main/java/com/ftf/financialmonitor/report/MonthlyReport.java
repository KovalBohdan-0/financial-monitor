package com.ftf.financialmonitor.report;

import java.math.BigDecimal;
import java.time.Month;

public record MonthlyReport(Month month,
                            BigDecimal sumOfIncome,
                            BigDecimal sumOfExpense) {
}
