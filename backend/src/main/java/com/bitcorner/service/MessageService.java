package com.bitcorner.service;


import com.bitcorner.entity.Message;
import com.bitcorner.entity.UserInfo;

import java.util.List;

public interface MessageService {
    void save(Message message);

    List<Message> getMessageThread(String userId1, String userId2);

    default void sendEmail(Message message){
        UserInfo toUser=message.getToUser();
        UserInfo fromUser=message.getFromUser();
        System.out.println(toUser.getUserName());
        System.out.println(fromUser.getNickName());
        // TODO Send Email From here
    }

    List<String> getConnectedUsers(String userId);
}
