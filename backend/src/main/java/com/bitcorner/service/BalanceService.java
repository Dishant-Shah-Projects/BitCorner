package com.bitcorner.service;

import com.bitcorner.entity.Balance;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

public interface BalanceService {
    void save(Balance balance);
    List<Balance> getAllBalance(String userId);
    Balance getBalance(String userId, long currencyId);
    void depositBalance(String userId,long currencyId,float depositAmount) throws BadAttributeValueExpException;

    void withdrawBalance(String userId,long currencyId,float withdrawAmount) throws BadAttributeValueExpException;

}
