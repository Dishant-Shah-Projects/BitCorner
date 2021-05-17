package com.bitcorner.service;

import com.bitcorner.entity.MarketPrice;

import java.util.List;

public interface MarketPriceService {
    MarketPrice getById(long id);
    MarketPrice getByCurrencyId(long currencyId);
    List<MarketPrice> getAll();
}
