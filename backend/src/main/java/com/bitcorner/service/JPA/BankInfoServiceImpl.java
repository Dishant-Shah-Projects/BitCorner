package com.bitcorner.service.JPA;

import com.bitcorner.entity.BankInfo;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.repository.BankInfoRepository;
import com.bitcorner.repository.UserInfoRepository;
import com.bitcorner.service.BankInfoService;
import com.bitcorner.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

@Service
public class BankInfoServiceImpl implements BankInfoService {

    @Autowired
    private BankInfoRepository repository;


    @Transactional
    @Override
    public void save(BankInfo bankInfo) {
        repository.save(bankInfo);
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
