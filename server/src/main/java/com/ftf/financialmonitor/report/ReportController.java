package com.ftf.financialmonitor.report;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/api/v1/report")
@AllArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/monthly-report/{year}")
    public List<MonthlyReport> getAllMonthlyReportsByYear(@PathVariable @DateTimeFormat(pattern = "yyyy") Year year) {
        return reportService.getListOfAllMonthlyReportsByYear(year);
    }

}
