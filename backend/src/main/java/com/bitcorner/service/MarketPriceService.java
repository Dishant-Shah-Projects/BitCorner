package com.bitcorner.service;

import com.bitcorner.entity.Currency;
import com.bitcorner.entity.MarketPrice;

public interface MarketPriceService {
    MarketPrice getById(long id);
}
