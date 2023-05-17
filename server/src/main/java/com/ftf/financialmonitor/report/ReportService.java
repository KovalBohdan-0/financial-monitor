package com.ftf.financialmonitor.report;

import com.ftf.financialmonitor.expense.ExpenseService;
import com.ftf.financialmonitor.income.IncomeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.time.Year;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReportService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;

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

}
