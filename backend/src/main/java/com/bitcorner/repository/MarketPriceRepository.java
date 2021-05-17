package com.bitcorner.repository;

import com.bitcorner.entity.MarketPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface MarketPriceRepository extends JpaRepository<MarketPrice, Long>  {
    MarketPrice findByCurrencyId(long currencyId);
}
