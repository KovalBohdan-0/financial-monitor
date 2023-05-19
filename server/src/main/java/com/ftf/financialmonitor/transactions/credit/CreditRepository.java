package com.ftf.financialmonitor.transactions.credit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {
    List<Credit> findAllByCustomerId(Long customerId);

    void deleteAllByCustomerId(Long customerId);
}
