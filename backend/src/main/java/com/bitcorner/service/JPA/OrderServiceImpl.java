package com.bitcorner.service.JPA;

import com.bitcorner.entity.Order_Table;
import com.bitcorner.repository.OrderRepository;
import com.bitcorner.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository repository;

    @Transactional
    @Override
    public void save(Order_Table order) {
        repository.save(order);
    }

    @Transactional
    @Override
    public List<Order_Table> getAllOrders() {
        return repository.findAll();
    }

    @Override
    public List<Order_Table> getSpecificOrders(String userId) {
        return repository.getSpecificOrders(userId);
    }

}
