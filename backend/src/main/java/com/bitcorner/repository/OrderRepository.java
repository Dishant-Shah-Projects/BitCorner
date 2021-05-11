package com.bitcorner.repository;

import com.bitcorner.entity.Order_Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order_Table, Long> {

    @Query("Select o FROM Order_Table o where o.userId = ?1")
    List<Order_Table> getSpecificOrders(String UserID);

    @Query(value = "SELECT SUM(QUANTITY) FROM ORDER_TABLE WHERE USER_ID=?1 AND ID!=?2 AND TYPE='SELL' AND STATUS='Open'",nativeQuery = true)
    BigDecimal getSumOfAllThePendingSellOrdersQuantity(String userId, Long orderId);

    @Query(value = "SELECT o.* FROM ORDER_TABLE o WHERE USER_ID=?1 AND ID!=?2 AND TYPE='BUY' AND STATUS='Open' AND CURRENCY_ID=?3",nativeQuery = true)
    List<Order_Table> findByUserIdAndCurrencyIdAndNotId(String userId, Long id, Long currencyId);

    @Query(value = "SELECT o.* FROM ORDER_TABLE o WHERE ID!=?1 AND STATUS='Open' AND CURRENCY_ID=?2 ORDER BY TIME",nativeQuery = true)
    List<Order_Table> getOpenOrdersToMatch(Long id, Long currencyId);
}
