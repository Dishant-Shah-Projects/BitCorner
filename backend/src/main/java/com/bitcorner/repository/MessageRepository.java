package com.bitcorner.repository;

import com.bitcorner.entity.Balance;
import com.bitcorner.entity.Message;
import com.bitcorner.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.fromUserId = ?1 and m.toUserId = ?2) or (m.fromUserId = ?2 and m.toUserId = ?1)")
    List<Message> findMessageThread(String userId1, String userId2);

    @Query(value = "(SELECT Distinct u.NICKNAME FROM MESSAGE m JOIN USER_INFO u on m.TO_USER=u.USER_ID WHERE m.FROM_USER = ?1) UNION (SELECT Distinct u.NICKNAME FROM MESSAGE m JOIN USER_INFO u on m.FROM_USER=u.USER_ID WHERE m.TO_USER = ?1)",nativeQuery = true)
    List<String> findConnectedUsers(String userId1);
}
