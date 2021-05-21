package com.bitcorner.service.JPA;

import com.bitcorner.entity.Bill;
import com.bitcorner.entity.Message;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.repository.MessageRepository;
import com.bitcorner.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository repository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Transactional
    @Override
    public void save(Message message) {
        repository.save(message);
        sendEmail(message);
    }

    @Transactional
    @Override
    public List<Message> getMessageThread(String userId1, String userId2) {
        return repository.findMessageThread(userId1, userId2);
    }

    @Transactional
    @Override
    public List<String> getConnectedUsers(String userId) {
        return repository.findConnectedUsers(userId);
    }

    public void sendEmail(Message message){
        UserInfo toUser=message.getToUser();
        UserInfo fromUser=message.getFromUser();
        String msg = message.getMessage();
        System.out.println(toUser.getUserName()); //this fetches the email_id of toUser
        System.out.println(fromUser.getNickName());
        // code to Send Email
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("bitcorner321@gmail.com");
        mail.setTo(toUser.getUserName()); 
        mail.setSubject("Notification from Bitcorner"); 
        mail.setText(msg);
        javaMailSender.send(mail);

    }

    public void sendBill(Bill bill,String subject){
        UserInfo toUser=bill.getToUser();
        UserInfo fromUser=bill.getFromUser();
        String msg = bill.getmessage();

        // code to Send Email
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("bitcorner321@gmail.com");
        mail.setTo(toUser.getUserName());
        mail.setSubject(subject);
        mail.setText(msg);
        javaMailSender.send(mail);
        SimpleMailMessage mail2 = new SimpleMailMessage();
        mail2.setFrom("bitcorner321@gmail.com");
        mail2.setTo(fromUser.getUserName());
        mail2.setSubject(subject);
        mail2.setText(msg);
        javaMailSender.send(mail2);

    }




}
