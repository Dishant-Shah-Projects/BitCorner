package com.bitcorner.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.management.BadAttributeValueExpException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="USER_INFO")
public class UserInfo {
    @Id
    @Column(name="USER_ID")
    private String id;

    @Column(name="USERNAME")
    private String userName;

    @Column(name="NICKNAME")
    private String nickName;

    @JsonIgnore
    public String getId() {
        return id;
    }

    public void setId(String id) throws BadAttributeValueExpException {
        if(id==null || id.isEmpty() || id.length()>100){
            throw new BadAttributeValueExpException("Invalid userid");
        }
        this.id = id;
    }

    public String getUserName() {

        return userName;
    }

    public void setUserName(String userName)throws BadAttributeValueExpException {
        if(userName==null || userName.isEmpty()){
            throw new BadAttributeValueExpException("Invalid username");
        }

        //TODO Validate Email Address and if not valid throw exception

        this.userName = userName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) throws BadAttributeValueExpException {
        if(nickName==null || nickName.isEmpty() || nickName.length()>50){
            throw new BadAttributeValueExpException("Invalid nickname");
        }

        // TODO Check alphanumeric
        this.nickName = nickName;
    }

    public UserInfo() {
    }

    public UserInfo(String id, String userName, String nickName) throws BadAttributeValueExpException {
        this.setId(id);
        this.setUserName(userName);
        this.setNickName(nickName);
    }
}
