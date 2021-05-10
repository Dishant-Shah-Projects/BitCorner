package com.bitcorner.entity;

//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.sun.xml.bind.v2.TODO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="ORDER_TABLE")
public class Order_Table{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="USER_ID")
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID",insertable = false,updatable = false)
    private UserInfo user;

    @Column(name="TYPE")
    private String type;

    @Column(name="PRICE_TYPE")
    private String priceType;

    @Column(name="QUANTITY")
    private BigDecimal quantity;

    @Column(name="LIMIT_PRICE")
    private long limitPrice;

    @Column(name="EXECUTION_PRICE")
    private long executionPrice;

    @Column(name="STATUS")
    private String status;

    @Column(name="SERVICE_FEE")
    private long serviceFee;

    @Column(name="CURRENCY_ID")
    private long currencyId;

    @Column(name="TIME")
    private Date time;

    @ManyToOne()
    @JoinColumn(name="CURRENCY_ID",insertable = false,updatable = false)
    private Currency currency;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    @JsonIgnore
    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPriceType() {
        return priceType;
    }

    public void setPriceType(String priceType) {
        this.priceType = priceType;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) throws BadAttributeValueExpException{
        BigDecimal r = new BigDecimal("0");
        int res = quantity.compareTo(r);
        if(res <= 0)
            throw new BadAttributeValueExpException("Order quantity has to be greater than zero");
        this.quantity = quantity;
    }

    public long getLimitPrice() {
        return limitPrice;
    }

    public void setLimitPrice(long limitPrice) {
        this.limitPrice = limitPrice;
    }

    public long getExecutionPrice() {
        return executionPrice;
    }

    public void setExecutionPrice(long executionPrice) {
        this.executionPrice = executionPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(long serviceFee) {
        this.serviceFee = serviceFee;
    }

    public long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(long currencyId) {
        this.currencyId = currencyId;
    }
    @JsonIgnore
    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Order_Table(){}

    public Order_Table(String userId,String type,String priceType,BigDecimal quantity,long limitPrice,
                 long executionPrice,String status,long serviceFee)
            throws BadAttributeValueExpException
    {
        this.setUserId(userId);
        this.setType(type);
        this.setPriceType(priceType);
        this.setQuantity(quantity);
        this.setLimitPrice(limitPrice);
        this.setExecutionPrice(executionPrice);
        this.setStatus(status);
        this.setServiceFee(serviceFee);
        //this.setCurrencyId(currencyId);
    }

}
