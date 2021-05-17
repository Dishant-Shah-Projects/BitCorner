package com.bitcorner.controller;

import com.bitcorner.auth.SecurityService;
import com.bitcorner.dataModel.ErrorResponse;
import com.bitcorner.entity.MarketPrice;
import com.bitcorner.entity.Order_Table;
import com.bitcorner.repository.MarketPriceRepository;
import com.bitcorner.service.MarketPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping("/marketprice")
public class MarketPriceController {

    @Autowired
    private HttpServletRequest request;
    @Autowired
    private MarketPriceService marketPriceService;
    @Autowired
    SecurityService securityService;

    //Method to get marketprice
    @RequestMapping(method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getMarketPrice(){
        try {
            //MarketPrice marketPrice = marketPriceService.getById(1);
            List<MarketPrice> marketPrice = marketPriceService.getAll();
            return new ResponseEntity<>(marketPrice, HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Method to get marketprice by currencyId
    @RequestMapping(method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE, value="/cid")
    @ResponseBody
    public ResponseEntity<?> getMarketPriceByCurrencyId(@RequestParam(name="currencyId", required=true) long currencyId){
        try {
            MarketPrice marketPrice = marketPriceService.getByCurrencyId(currencyId);
            return new ResponseEntity<>(marketPrice, HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
