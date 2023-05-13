package com.ftf.financialmonitor.income;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findAllByCustomerId(Long customerId);

    void deleteAllByCustomerId(Long customerId);
}
