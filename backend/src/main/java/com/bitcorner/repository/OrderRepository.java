package com.bitcorner.repository;

import com.bitcorner.entity.Order_Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order_Table, Long> {

    @Query("Select o FROM Order_Table o where o.userId = ?1")
    List<Order_Table> getSpecificOrders(String UserID);
}
