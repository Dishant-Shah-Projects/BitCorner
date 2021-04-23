package com.bitcorner.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name="MESSAGE")
public class Message {
    @Id
    @Column(name="ID")
    private long id;

    @Column(name="FROM_USER")
    private String fromUserId;

    @Column(name="TO_USER")
    private String toUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="FROM_USER",insertable = false,updatable = false)
    private UserInfo fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="TO_USER",insertable = false,updatable = false)
    private UserInfo toUser;

    @Column(name="MESSAGE")
    private String message;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @JsonIgnore
    public UserInfo getFromUser() {
        return fromUser;
    }

    public void setFromUser(UserInfo fromUser) throws BadAttributeValueExpException {
        if(fromUser==null){
            throw new BadAttributeValueExpException("fromUser is invalid");
        }
        this.fromUser = fromUser;
    }

    @JsonIgnore
    public UserInfo getToUser() {
        return toUser;
    }

    public void setToUser(UserInfo toUser)  throws BadAttributeValueExpException {
        if(toUser==null){
            throw new BadAttributeValueExpException("toUser is invalid");
        }
        this.toUser = toUser;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) throws BadAttributeValueExpException {
        if(message==null || message.isEmpty() || message.length()>1000){
            throw new BadAttributeValueExpException("message is invalid");
        }
        this.message = message;
    }

    public String getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(String fromUserId) throws BadAttributeValueExpException {
        if(fromUserId==null || fromUserId.isEmpty()){
            throw new BadAttributeValueExpException("fromUserId is invalid");
        }
        this.fromUserId = fromUserId;
    }

    public String getToUserId() {
        return toUserId;
    }

    public void setToUserId(String toUserId) throws BadAttributeValueExpException {
        if(toUserId==null || toUserId.isEmpty()) {
            throw new BadAttributeValueExpException("toUserId is invalid");
        }
        this.toUserId = toUserId;
    }

    public Message() {
    }

    public Message(String fromUserId, String toUserId, String message) throws BadAttributeValueExpException {
        this.setFromUserId(fromUserId);
        this.setToUserId(toUserId);
        this.setMessage(message);
    }
}
