package com.ftf.financialmonitor.customer;

public record CustomerDto(String firstname,
                         String surname,
                         String email,
                         boolean enabled) { }
