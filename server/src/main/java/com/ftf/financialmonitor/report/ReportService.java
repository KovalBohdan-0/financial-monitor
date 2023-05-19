package com.ftf.financialmonitor.report;

import com.ftf.financialmonitor.transactions.credit.CreditService;
import com.ftf.financialmonitor.transactions.deposit.DepositService;
import com.ftf.financialmonitor.transactions.expense.ExpenseService;
import com.ftf.financialmonitor.transactions.income.IncomeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.time.Year;
import java.time.YearMonth;
import java.util.*;

@Service
@AllArgsConstructor
public class ReportService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final CreditService creditService;
    private final DepositService depositService;

    public List<MonthlyReport> getListOfAllMonthlyReportsByYear(Year year) {
        List<MonthlyReport> monthlyReports = new ArrayList<>();

        for (Month month : Month.values()) {
            YearMonth currentYearMonth = YearMonth.of(year.getValue(), month);

            MonthlyReport monthlyReport = new MonthlyReport(
                    month,
                    incomeService.getSumOfAllIncomesOfCustomerByMonth(currentYearMonth),
                    expenseService.getSumOfAllExpensesOfCustomerByMonth(currentYearMonth)
            );

            monthlyReports.add(monthlyReport);
        }

        return monthlyReports;
    }

    public List<TransactionReport> getListOfAllTransactionsOfCustomer() {
        List<TransactionReport> transactionList = new ArrayList<>();

        incomeService.getAllIncomesOfCustomer().forEach(transaction -> transactionList.add(new TransactionReport("Income", transaction)));
        expenseService.getAllExpensesOfCustomer().forEach(transaction -> transactionList.add(new TransactionReport("Expense", transaction)));
        creditService.getAllCreditsOfCustomer().forEach(transaction -> transactionList.add(new TransactionReport("Credit", transaction)));
        depositService.getAllDepositsOfCustomer().forEach(transaction -> transactionList.add(new TransactionReport("Deposit", transaction)));

        transactionList.sort(Comparator.comparing(
                transaction -> transaction.transaction().getCreationTime()
        ));

        return transactionList;
    }
}
