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
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderTableController {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private OrderService Orderservice;

    @Autowired
    SecurityService securityService;

//    //Method to get all orders
//    @RequestMapping(method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
//    public ResponseEntity<?> getAllOrders(){
//        try {
//            List<Order_Table> OrdersList=Orderservice.getAllOrders();
//            return new ResponseEntity<>(OrdersList, HttpStatus.OK);
//        }catch (EntityNotFoundException ex){
//            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
//        }catch (Exception ex){
//            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

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
            order_table.setStatus("PENDING");
            order_table.setExecutionPrice(0);
            order_table.setServiceFee(0);
            Orderservice.save(order_table);
            return new ResponseEntity<>(order_table, HttpStatus.OK);
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
