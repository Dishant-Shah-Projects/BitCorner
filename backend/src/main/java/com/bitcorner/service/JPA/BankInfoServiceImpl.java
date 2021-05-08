package com.bitcorner.service.JPA;

import com.bitcorner.entity.Balance;
import com.bitcorner.entity.BankInfo;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.repository.BankInfoRepository;
import com.bitcorner.repository.UserInfoRepository;
import com.bitcorner.service.BalanceService;
import com.bitcorner.service.BankInfoService;
import com.bitcorner.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

@Service
public class BankInfoServiceImpl implements BankInfoService {

    @Autowired
    private BankInfoRepository repository;

    @Autowired
    private BalanceService balanceService;


    @Transactional
    @Override
    public void save(BankInfo bankInfo) throws BadAttributeValueExpException
    {
        repository.save(bankInfo);
        Balance balance=new Balance(bankInfo.getUserId(), bankInfo.getPrimaryCurrencyId(), bankInfo.getInitialBalance());
        balanceService.save(balance);
    }

    @Transactional
    @Override
    public BankInfo getById(String userId) throws EntityNotFoundException{
        BankInfo bankInfo=repository.findById(userId).orElse(null);

        if(bankInfo==null){
            throw new EntityNotFoundException("BankInfo is missing");
        }
        return bankInfo;
    }
}
