package com.example.msorder.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Async
    public void simpleEmail(String mail,Double totalPrice, Long orderId, int amountTicket, Long eventId){
        try{
            Context context = new Context();
            context.setVariables(Map.of("ordernum", orderId,"price",totalPrice.toString(),"qty", amountTicket,"url","http://ec2-50-16-167-162.compute-1.amazonaws.com:3000/events/"+eventId));
            String text = templateEngine.process("order",context);
            MimeMessage message = getMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setSubject("Successful order N°"+orderId);
            helper.setFrom("passportalg7@gmail.com");
            helper.setTo(mail);
            helper.setText(text, true);
            javaMailSender.send(message);


        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private MimeMessage getMimeMessage(){
        return javaMailSender.createMimeMessage();
    }
}
