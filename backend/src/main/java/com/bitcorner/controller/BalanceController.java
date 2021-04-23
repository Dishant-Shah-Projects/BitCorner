package com.bitcorner.controller;

import com.bitcorner.DataModel.ErrorResponse;
import com.bitcorner.DataModel.SuccessResponse;
import com.bitcorner.entity.Balance;
import com.bitcorner.service.BalanceService;
import com.bitcorner.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity<?> depositBalance(@PathVariable("currencyId") long currencyId,@RequestParam(name = "amount", required = true) float depositAmount){
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
    public ResponseEntity<?> withdrawBalance(@PathVariable("currencyId") long currencyId,@RequestParam(name = "amount", required = true) float withdrawAmount){
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
        return request.getHeader("userId");
    }
}
