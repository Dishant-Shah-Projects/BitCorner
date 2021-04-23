package com.bitcorner.service.JPA;

import com.bitcorner.entity.Balance;
import com.bitcorner.entity.Currency;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.repository.UserInfoRepository;
import com.bitcorner.service.BalanceService;
import com.bitcorner.service.CurrencyService;
import com.bitcorner.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private BalanceService balanceService;

    @Autowired
    private CurrencyService currencyService;


    @Override
    public void create(UserInfo userInfo) throws BadAttributeValueExpException {
        repository.save(userInfo);

        List<Currency> currencyList=currencyService.getAllCurrency();
        for(Currency currency:currencyList){
            Balance balance=new Balance(userInfo.getId(),currency.getId(),currency.getInitialValue());
            balanceService.save(balance);
        }
    }

    @Override
    public void update(UserInfo userInfo) {
        repository.save(userInfo);
    }

    @Transactional
    @Override
    public UserInfo getById(String userId) throws EntityNotFoundException{
        UserInfo userInfo=repository.findById(userId).orElse(null);

        if(userInfo==null){
            throw new EntityNotFoundException("UserInfo is missing");
        }
        return userInfo;
    }

    @Override
    public boolean isUserInfoAvailable(String userId) {
        UserInfo userInfo=repository.findById(userId).orElse(null);

        return userInfo==null?false:true;
    }

    @Override
    public UserInfo getByNickName(String nickName)throws EntityNotFoundException{
        UserInfo userInfo=repository.findByNickname(nickName);

        if(userInfo==null){
            throw new EntityNotFoundException("User Does not exists");
        }
        return userInfo;
    }

    @Override
    public List<String> searchUsersByNickName(String nickName) {
        return repository.searchUsersByNickName(nickName);
    }
}
