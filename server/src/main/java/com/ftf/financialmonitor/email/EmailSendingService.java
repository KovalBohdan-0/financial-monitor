package com.ftf.financialmonitor.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSendingService {
    private final JavaMailSender mailSender;

    public EmailSendingService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String toMail, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("gftonot@gmail.com");
        message.setTo(toMail);
        message.setText(body);

        mailSender.send(message);
    }
}
