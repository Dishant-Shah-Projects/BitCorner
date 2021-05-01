package com.bitcorner.controller;

import com.bitcorner.dataModel.ErrorResponse;
import com.bitcorner.entity.BankInfo;
import com.bitcorner.entity.Currency;
import com.bitcorner.service.BankInfoService;
import com.bitcorner.service.CurrencyService;
import com.bitcorner.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/bank")
public class BankInfoController {

    @Autowired
    BankInfoService bankInfoService;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    CurrencyService currencyService;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getBankInfo()
    {
        try {
            String userId=getUserId();
            if(userId==null || userId.isEmpty()){
                throw new BadAttributeValueExpException("Invalid UserId");
            }
            BankInfo bankInfo=bankInfoService.getById(userId);
            return new ResponseEntity<>(bankInfo, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (BadAttributeValueExpException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.toString()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> saveBankInfo(@RequestParam(name = "bankName", required = true) String bankName, @RequestParam(name = "country", required = true) String country, @RequestParam(name = "accountNumber", required = true) long accountNumber, @RequestParam(name = "ownerName", required = true) String ownerName,@RequestParam(name = "street", required = true) String street,@RequestParam(name = "city", required = true) String city,@RequestParam(name = "state", required = true) String state,@RequestParam(name = "zip", required = true) String zip,@RequestParam(name = "primaryCurrencyId", required = true) long primaryCurrencyId)
    {
        try {
            String userId=getUserId();
            Currency currency=currencyService.getById(primaryCurrencyId);
            BankInfo bankInfo=new BankInfo(userId,bankName,country,accountNumber,ownerName,street,city,state,zip,currency);
            bankInfoService.save(bankInfo);

            return new ResponseEntity<>(bankInfo, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (BadAttributeValueExpException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.toString()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getUserId(){
        return request.getHeader("userId");
    }
}
