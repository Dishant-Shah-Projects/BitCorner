package com.bitcorner.repository;

import com.bitcorner.entity.BankInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankInfoRepository extends JpaRepository<BankInfo,String> {
}
