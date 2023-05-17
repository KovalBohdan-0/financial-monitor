package com.ftf.financialmonitor.customer;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id){
        log.info("fetching customer with id {}", id);
        return  customerService.getCustomerById(id);
    }

    @GetMapping("/{email}")
    public Customer getCustomerByEmail(@PathVariable String email){
        log.info("fetching customer with id {}", email);
        return  customerService.getCustomerByEmail(email);
    }

    @GetMapping
    public CustomerDto getCurrentCustomer() {
        return customerService.getCurrentCustomer();
    }

}

