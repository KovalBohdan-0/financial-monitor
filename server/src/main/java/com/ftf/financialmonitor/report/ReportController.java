package com.ftf.financialmonitor.report;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Returns monthly report",
            description = "Returns monthly report of income and expense of customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully returned report",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = MonthlyReport.class))})})
    @GetMapping("/monthly-report/{year}")
    public List<MonthlyReport> getAllMonthlyReportsByYear(@PathVariable @DateTimeFormat(pattern = "yyyy") Year year) {
        return reportService.getListOfAllMonthlyReportsByYear(year);
    }

    @Operation(summary = "Returns all transactions",
            description = "Returns all transactions of customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successfully returned list of transactions",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = TransactionReport.class))})})
    @GetMapping("/all-transactions")
    public List<TransactionReport> getAllTransactionsOfCustomer() {
        return reportService.getListOfAllTransactionsOfCustomer();
    }
}
