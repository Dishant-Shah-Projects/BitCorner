package com.bitcorner.repository;

import com.bitcorner.entity.MarketPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketPriceRepository extends JpaRepository<MarketPrice, Long>  {
}
