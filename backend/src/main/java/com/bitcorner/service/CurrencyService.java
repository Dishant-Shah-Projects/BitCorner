package com.bitcorner.service;

import com.bitcorner.entity.Currency;

import java.util.List;

public interface CurrencyService {
    void save(Currency currency);

    Currency getById(Long id);

    List<Currency> getAllCurrency();


}
