package com.ftf.financialmonitor.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmail(String email);
    Optional<Customer> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Customer c " +
            "SET c.enabled = true " +
            "WHERE c.email = ?1")
    int enableCustomerWithEmail(String email);
}
