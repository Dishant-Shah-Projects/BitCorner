package com.bitcorner.service;

import com.bitcorner.entity.Order_Table;

import java.util.List;

public interface OrderService {
    void save(Order_Table order);
    List<Order_Table> getAllOrders();
    List<Order_Table> getSpecificOrders(String userId);
}
