package com.bitcorner.controller;

import com.bitcorner.auth.SecurityService;
import com.bitcorner.dataModel.ErrorResponse;
import com.bitcorner.dataModel.SuccessResponse;
import com.bitcorner.entity.Balance;
import com.bitcorner.service.BalanceService;
import com.bitcorner.service.UserInfoService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/balance")
public class BalanceController {

    @Autowired
    BalanceService balanceService;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    SecurityService securityService;

    @RequestMapping(method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getAllBalance(){
        try {
            String userId=getUserId();
            List<Balance> balanceList=balanceService.getAllBalance(userId);
            return new ResponseEntity<>(balanceList, HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "{currencyId}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getBalance(@PathVariable("currencyId") long currencyId){
        try {
            String userId=getUserId();
            Balance balance=balanceService.getBalance(userId,currencyId);
            return new ResponseEntity<>(balance, HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "{currencyId}/deposit",method = RequestMethod.PUT,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> depositBalance(@PathVariable("currencyId") long currencyId,@RequestParam(name = "amount", required = true) BigDecimal depositAmount){
        try {
            String userId=getUserId();
            balanceService.depositBalance(userId,currencyId,depositAmount);
            return new ResponseEntity<>(new SuccessResponse("Amount deposited to account"), HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "{currencyId}/withdraw",method = RequestMethod.PUT,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> withdrawBalance(@PathVariable("currencyId") long currencyId,@RequestParam(name = "amount", required = true) BigDecimal withdrawAmount){
        try {
            String userId=getUserId();
            balanceService.withdrawBalance(userId,currencyId,withdrawAmount);
            return new ResponseEntity<>(new SuccessResponse("Amount withdrawn from account"), HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getUserId(){
        String token = securityService.getBearerToken(request);
        FirebaseToken decodedToken =null;
        try {
            decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
        }
        catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        System.out.println(decodedToken.getUid());
        return decodedToken.getUid();
    }
}
