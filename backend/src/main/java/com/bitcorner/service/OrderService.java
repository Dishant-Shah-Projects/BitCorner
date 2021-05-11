package com.bitcorner.service;

import com.bitcorner.entity.Order_Table;

import javax.management.BadAttributeValueExpException;
import java.math.BigDecimal;
import java.util.List;

public interface OrderService {
    void save(Order_Table order) throws BadAttributeValueExpException;
    List<Order_Table> getAllOrders();
    List<Order_Table> getSpecificOrders(String userId);
    void isOrderValid(Order_Table order) throws BadAttributeValueExpException;
}
