package com.bitcorner.service;

import com.bitcorner.entity.UserInfo;
import org.apache.catalina.User;

import javax.management.BadAttributeValueExpException;
import java.util.List;

public interface UserInfoService {
    void create(UserInfo userInfo) throws BadAttributeValueExpException;
    void update(UserInfo userInfo);

    UserInfo getById(String userId);

    boolean isUserInfoAvailable(String userId);

    UserInfo getByNickName(String nickName);

    List<String> searchUsersByNickName(String nickName);
}
