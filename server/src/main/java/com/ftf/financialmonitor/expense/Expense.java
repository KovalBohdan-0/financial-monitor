package com.ftf.financialmonitor.expense;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "finance_monitor", schema = "public")
public class Expense {
    @Id
    @Column(name = "id")
    private Long id;
    @Column(name = "money")
    private BigDecimal money;
    @Column(name = "description")
    private String description;
    @Column(name = "creation_time")
    private LocalDateTime creationTime;
    @Column(name = "customer_id")
    private Long customerId;
}
