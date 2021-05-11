package com.bitcorner.service.JPA;

import com.bitcorner.entity.Currency;
import com.bitcorner.repository.CurrencyRepository;
import com.bitcorner.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class CurrencyServiceImpl implements CurrencyService {
    @Autowired
    private CurrencyRepository repository;

    @Transactional
    @Override
    public void save(Currency currency) {
        repository.save(currency);
    }

    @Transactional
    @Override
    public Currency getById(Long id) throws EntityNotFoundException {
        Currency currency=repository.findById(id).orElse(null);
        if(currency==null){
            throw new EntityNotFoundException("Currency is missing");
        }
        return currency;
    }

    @Transactional
    @Override
    public List<Currency> getAllCurrency() {
        return repository.findAll();
    }

    public BigDecimal convertAmount(Currency fromCurrency, Currency toCurrency, BigDecimal amount){
        if(fromCurrency.getId()==toCurrency.getId()){
            return amount;
        }
        BigDecimal conversionFactor=new BigDecimal(toCurrency.getConversionRate()/fromCurrency.getConversionRate());
        return amount.multiply(conversionFactor);
    }

    public BigDecimal convertAmount(long fromCurrencyId, long toCurrencyId, BigDecimal amount){
        Currency fromCurrency=getById(fromCurrencyId);
        Currency toCurrency=getById(toCurrencyId);
        return  convertAmount(fromCurrency,toCurrency,amount);
    }
}
