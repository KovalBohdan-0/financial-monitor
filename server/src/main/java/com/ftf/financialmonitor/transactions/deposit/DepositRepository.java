package com.ftf.financialmonitor.transactions.deposit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Long> {
    List<Deposit> findAllByCustomerId(Long customerId);

    void deleteAllByCustomerId(Long customerId);
}
