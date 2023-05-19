package com.ftf.financialmonitor.transactions.expense;

import com.ftf.financialmonitor.transactions.Transaction;
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
public class Expense implements Transaction {
    @Id
    @SequenceGenerator(
            name = "expense_id_sequence",
            sequenceName = "expense_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "expense_id_sequence"
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

    @Override
    public LocalDateTime getCreationTime(){
        return creationTime;
    }
}
