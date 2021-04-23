package com.bitcorner.service.JPA;

import com.bitcorner.entity.Message;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.repository.MessageRepository;
import com.bitcorner.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository repository;

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
}
