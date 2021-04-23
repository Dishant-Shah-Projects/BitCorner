package com.bitcorner.repository;

import com.bitcorner.entity.Balance;
import com.bitcorner.entity.UserInfo;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserInfoRepository  extends JpaRepository<UserInfo,String> {

    UserInfo findByNickName(String nickName);

    UserInfo findByUserNameIgnoreCase(String userName);

    List<UserInfo> findByNickNameContainingIgnoreCase(String nickName);
}
