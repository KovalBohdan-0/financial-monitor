package com.ftf.financialmonitor.transactions.income;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Income {
    @Id
    @SequenceGenerator(
            name = "income_id_sequence",
            sequenceName = "income_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "income_id_sequence"
    )
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false)
    private BigDecimal money;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private LocalDateTime creationTime;
    @Column(nullable = false)
    private Long customerId;
}
