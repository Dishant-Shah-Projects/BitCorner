package com.bitcorner.repository;

import com.bitcorner.entity.Bill;
import com.bitcorner.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill,Long> {
    @Query("select p from Bill p where p.fromUserId like %?1")
    public List<Bill> findByfromUserId(String FROM_USER);
    @Query("select p from Bill p where p.toUserId like %?1")
    public List<Bill> findBytoUserId(String toEmail);
}
