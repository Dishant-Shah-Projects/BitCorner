package com.bitcorner.controller;

import com.bitcorner.service.BalanceService;
import com.bitcorner.service.BankInfoService;
import com.bitcorner.service.CurrencyService;
import com.bitcorner.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/bill")
public class BillController {
    @Autowired
    BalanceService balanceService;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    CurrencyService currencyService;

    @Autowired
    private HttpServletRequest request;

    public String getUserId(){
        return request.getHeader("userId");
    }
}
