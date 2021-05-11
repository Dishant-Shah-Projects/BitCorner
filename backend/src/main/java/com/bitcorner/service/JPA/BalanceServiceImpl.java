package com.bitcorner.service.JPA;

import com.bitcorner.entity.Balance;
import com.bitcorner.entity.BalanceCompositeId;
import com.bitcorner.repository.BalanceRepository;
import com.bitcorner.service.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class BalanceServiceImpl implements BalanceService {

    @Autowired
    private BalanceRepository repository;

    @Transactional
    @Override
    public void save(Balance balance) {
        repository.save(balance);
    }

    @Transactional
    @Override
    public List<Balance> getAllBalance(String userId) {

        return repository.findAllBalances(userId);
    }

    @Transactional
    @Override
    public Balance getBalance(String userId, long currencyId) throws EntityNotFoundException {
        BalanceCompositeId balanceCompositeId=new BalanceCompositeId(userId,currencyId);
        Balance balance=repository.findById(balanceCompositeId).orElse(null);
        if(balance==null){
            throw new EntityNotFoundException("Balance is missing");
        }
        return balance;
    }

    @Transactional
    @Override
    public void depositBalance(String userId, long currencyId, BigDecimal depositAmount) throws EntityNotFoundException, BadAttributeValueExpException {
        BalanceCompositeId balanceCompositeId=new BalanceCompositeId(userId,currencyId);
        Balance balance=repository.findById(balanceCompositeId).orElse(null);
        if(balance==null){
            throw new EntityNotFoundException("Balance is missing");
        }
        balance.addAmount(depositAmount);
        save(balance);
    }

    @Transactional
    @Override
    public void withdrawBalance(String userId, long currencyId, BigDecimal withdrawAmount) throws EntityNotFoundException, BadAttributeValueExpException {
        BalanceCompositeId balanceCompositeId=new BalanceCompositeId(userId,currencyId);
        Balance balance=repository.findById(balanceCompositeId).orElse(null);
        if(balance==null){
            throw new EntityNotFoundException("Balance is missing");
        }
        balance.subtractAmount(withdrawAmount);
        save(balance);
    }
}
