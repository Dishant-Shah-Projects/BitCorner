package com.bitcorner.controller;

import com.bitcorner.auth.SecurityService;
import com.bitcorner.dataModel.ErrorResponse;
import com.bitcorner.dataModel.SuccessResponse;
import com.bitcorner.entity.Balance;
import com.bitcorner.entity.Bill;
import com.bitcorner.entity.Currency;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.repository.BillRepository;
import com.bitcorner.service.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

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
    SecurityService securityService;
    @Autowired
    BillService billService;

    @Autowired
    private HttpServletRequest request;

        @RequestMapping(method = RequestMethod.POST, produces =  MediaType.APPLICATION_JSON_VALUE)
        @ResponseBody
        public ResponseEntity<?> update(
                                          @RequestParam(name = "ID", required = true) Long id,
                                          @RequestParam(name = "Description", required = true) String Description,
                                          @RequestParam(name = "target_currency", required = true) Long currid,
                                          @RequestParam(name = "amount", required = true) float amount,
                                          @RequestParam(name = "duedate", required = true) Date DueDate
                                          )
        {
            try {
                Currency currency =currencyService.getById(currid);
                System.out.println(id);
                Bill bill = billService.getById(id);
    
                bill.setDescription(Description);
                bill.setAmount(amount);
                bill.setDueDate(DueDate);
                bill.setTargetCurrency(currency);
    
                billService.update(bill);
                return new ResponseEntity<>(new SuccessResponse("UPdated"), HttpStatus.OK);
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
    public ResponseEntity<?> create(  @RequestParam(name = "toEmail", required = true) String toEmail,
                                      @RequestParam(name = "Description", required = true) String Description,
                                      @RequestParam(name = "target_currency", required = true) Long currid,
                                      @RequestParam(name = "amount", required = true) float amount,
                                      @RequestParam(name = "duedate", required = true) Date DueDate
    )
    {
        try {
            String fromID = getUserId();
            UserInfo userto=userInfoService.getByUserName(toEmail);
            Currency currency =currencyService.getById(currid);
            Bill bill = new Bill(fromID,userto.getId(),currency,amount,DueDate,Description);
            bill.setStatus("Waiting");
            billService.create(bill);
            return new ResponseEntity<>(bill, HttpStatus.OK);
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
    @RequestMapping(value = "/pay",method = RequestMethod.PUT, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> paybill(@RequestParam(name = "ID", required = true) Long id,

                                    @RequestParam(name = "pay_currency", required = true) Long currid2
    )
    {
        try {


            Bill bill = billService.getById(id);
            if(currid2==bill.getTargetCurrency().getId()){
                balanceService.withdrawBalance(bill.getToUserId(),currid2,new BigDecimal(bill.getAmount()));
                balanceService.depositBalance(bill.getFromUserId(),currid2,new BigDecimal(bill.getAmount()));
                bill.setStatus("Paid");
                bill.setServiceFee(0);
            }
            else{
                BigDecimal payamount = currencyService.convertAmount(bill.getTargetCurrency().getId(),currid2,new BigDecimal(bill.getAmount()));
                balanceService.withdrawBalance(bill.getToUserId(),currid2, payamount.multiply(new BigDecimal(1.0001)));
                balanceService.depositBalance(bill.getFromUserId(),bill.getTargetCurrency().getId(),new BigDecimal(bill.getAmount()));
                bill.setStatus("Paid");
                bill.setServiceFee((float) (Float.parseFloat(payamount.toString())*0.0001));

            }
            billService.update(bill);
            return new ResponseEntity<>(new SuccessResponse("Bill Payed Successfully"), HttpStatus.OK);
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
    @RequestMapping(value = "/cancel",method = RequestMethod.PUT, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> cancelBill(@RequestParam(name = "ID", required = true) Long id
    )
    {
        try {


            Bill bill = billService.getById(id);
            bill.setStatus("Cancelled");

            billService.update(bill);
            return new ResponseEntity<>(new SuccessResponse("Bill Canceled Successfully"), HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/reject",method = RequestMethod.PUT, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> rejectBill(@RequestParam(name = "ID", required = true) Long id
    )
    {
        try {


            Bill bill = billService.getById(id);
            bill.setStatus("Rejected");

            billService.update(bill);
            return new ResponseEntity<>(new SuccessResponse("Bill Canceled Successfully"), HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/own",method = RequestMethod.GET, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getall()
    {
        try {
            String fromID = getUserId();
            List<Bill> bills = billService.getByFromEmail(fromID);
            return new ResponseEntity<>(bills, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
//        catch (BadAttributeValueExpException ex){
//            return new ResponseEntity<>(new ErrorResponse(ex.toString()), HttpStatus.BAD_REQUEST);
//        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/pay",method = RequestMethod.GET, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getallpay(
    )
    {
        try {
            String toID = getUserId();
            List<Bill> bills = billService.getBytoEmail(toID);
            return new ResponseEntity<>(bills, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
//        catch (BadAttributeValueExpException ex){
//            return new ResponseEntity<>(new ErrorResponse(ex.toString()), HttpStatus.BAD_REQUEST);
//        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getUserId() throws FirebaseAuthException {
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
