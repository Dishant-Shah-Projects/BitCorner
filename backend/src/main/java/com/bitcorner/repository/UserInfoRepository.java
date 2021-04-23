package com.bitcorner.repository;

import com.bitcorner.entity.Balance;
import com.bitcorner.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserInfoRepository  extends JpaRepository<UserInfo,String> {

    @Query("SELECT b FROM UserInfo b WHERE b.nickName = ?1")
    UserInfo findByNickname(String nickname);

    @Query(value = "SELECT u.NICKNAME FROM USER_INFO u WHERE u.NICKNAME like '%?1%'",nativeQuery = true)
    List<String> searchUsersByNickName(String nickname);
}
