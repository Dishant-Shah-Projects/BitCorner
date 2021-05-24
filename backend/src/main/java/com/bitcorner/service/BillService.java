package com.bitcorner.service;

import com.bitcorner.entity.Bill;
import com.bitcorner.entity.UserInfo;

import javax.management.BadAttributeValueExpException;
import java.util.List;

public interface BillService {
    void create(Bill bill
    ) throws BadAttributeValueExpException;
    void update(Bill bill);

    Bill getById(Long Id);

    List<Bill> getByFromEmail(String fromEmail);
//
    List<Bill> getBytoEmail(String toEmail);

    List<Bill> getAllBills();

}
