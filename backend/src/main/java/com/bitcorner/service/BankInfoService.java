package com.bitcorner.service;

import com.bitcorner.entity.BankInfo;

public interface BankInfoService {
    void save(BankInfo bankInfo);

    BankInfo getById(String userId);
}
