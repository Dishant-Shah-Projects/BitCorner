package com.bitcorner.service.JPA;

import com.bitcorner.entity.Currency;
import com.bitcorner.entity.MarketPrice;
import com.bitcorner.repository.MarketPriceRepository;
import com.bitcorner.service.MarketPriceService;

public class MarketPriceImpl implements MarketPriceService {

    private MarketPriceRepository repository;

    @Override
    public MarketPrice getById(long id) {
        return repository.findById(id).orElse(null);
    }
}
