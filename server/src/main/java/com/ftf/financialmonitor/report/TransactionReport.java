package com.ftf.financialmonitor.report;

import com.ftf.financialmonitor.transactions.Transaction;

public record TransactionReport(String transactionType,
                                Transaction transaction) {
}
