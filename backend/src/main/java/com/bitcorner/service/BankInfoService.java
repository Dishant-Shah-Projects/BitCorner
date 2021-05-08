package com.bitcorner.service;

import com.bitcorner.entity.BankInfo;

import javax.management.BadAttributeValueExpException;

public interface BankInfoService {
    void save(BankInfo bankInfo) throws BadAttributeValueExpException;

    BankInfo getById(String userId);
}
