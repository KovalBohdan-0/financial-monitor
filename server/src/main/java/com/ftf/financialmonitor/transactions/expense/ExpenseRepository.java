package com.ftf.financialmonitor.transactions.expense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findAllByCustomerId(Long customerId);

    void deleteAllByCustomerId(Long customerId);
}
