package com.bitcorner.controller;

import com.bitcorner.dataModel.ErrorResponse;
import com.bitcorner.entity.*;
import com.bitcorner.service.OrderService;
import com.bitcorner.service.UserInfoService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bitcorner.auth.SecurityService;
import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/order")
public class OrderTableController {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private OrderService Orderservice;

    @Autowired
    SecurityService securityService;

    //Method to get all orders
    @RequestMapping(method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE, value = "/all")
    @ResponseBody
    public ResponseEntity<?> getAllOrders(){
        try {
            List<Order_Table> OrdersList=Orderservice.getAllOrders();
            return new ResponseEntity<>(OrdersList, HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Method to get orders based on user_id
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getSpecificOrders()
    {
        try {
            String userId=getUserId();
            if(userId==null || userId.isEmpty()){
                throw new BadAttributeValueExpException("Invalid UserId");
            }
            List<Order_Table> orders = Orderservice.getSpecificOrders(userId);
            return new ResponseEntity<>(orders, HttpStatus.OK);
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

    //Method to save the order
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> saveOrder(@RequestBody Order_Table order_table){
        try {
            String userId=getUserId();
//            Currency currency=currencyService.getById(bankInfo.getPrimaryCurrencyId());
            order_table.setUserId(userId);
            order_table.setStatus("Open");
            order_table.setExecutionPrice(null);
            order_table.setServiceFee(null);
            Date d = new Date();
//            DateFormat df = new SimpleDateFormat("MM/dd/yy HH:mm:ss");
            order_table.setTime(d);

            Orderservice.save(order_table);

            return new ResponseEntity<>(order_table, HttpStatus.OK);
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

    //Method to update the order
    @RequestMapping(value="/update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> updateOrder(@RequestParam(name="orderId", required=true) long orderId,@RequestBody Order_Table order_table){
        try {
            String userId=getUserId();
//            Currency currency=currencyService.getById(bankInfo.getPrimaryCurrencyId());
            order_table.setUserId(userId);
            order_table.setStatus("Open");
            order_table.setExecutionPrice(null);
            order_table.setServiceFee(null);
            order_table.setId(orderId);
            Date d = new Date();
            order_table.setTime(d);
            Orderservice.save(order_table);
            return new ResponseEntity<>(order_table, HttpStatus.OK);
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

    //Method to cancel the order
    @RequestMapping(value="/cancel", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> cancelOrder(@RequestParam(name="orderId", required=true) long orderId,@RequestBody Order_Table order_table){
        try {
            String userId=getUserId();
            order_table.setUserId(userId);
            order_table.setStatus("Cancelled");
            order_table.setExecutionPrice(null);
            order_table.setServiceFee(null);
            order_table.setId(orderId);
            Date d = new Date();
            order_table.setTime(d);
            Orderservice.update(order_table);
            return new ResponseEntity<>(order_table, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
//
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
