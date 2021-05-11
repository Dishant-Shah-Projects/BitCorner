package com.bitcorner.repository;

import com.bitcorner.entity.BalanceCompositeId;
import com.bitcorner.entity.Balance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface BalanceRepository extends JpaRepository<Balance, BalanceCompositeId> {

    @Query("SELECT b FROM Balance b WHERE b.userId = ?1")
    List<Balance> findAllBalances(String userId);

    Balance findByUserIdAndCurrencyId(String userId, long currencyId);
}
