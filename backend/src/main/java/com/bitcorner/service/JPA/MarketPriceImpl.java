package com.bitcorner.service.JPA;

import com.bitcorner.entity.MarketPrice;
import com.bitcorner.repository.MarketPriceRepository;
import com.bitcorner.service.MarketPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketPriceImpl implements MarketPriceService {

    @Autowired
    private MarketPriceRepository repository;

    @Override
    public MarketPrice getById(long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public MarketPrice getByCurrencyId(long currencyId) {
        return repository.getByCurrencyId(currencyId);
    }

    @Override
    public List<MarketPrice> getAll() {
        return repository.findAll();
    }

}
