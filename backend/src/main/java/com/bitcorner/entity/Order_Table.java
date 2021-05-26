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
    private BigDecimal limitPrice;

    @Column(name="EXECUTION_PRICE")
    private BigDecimal executionPrice;

    @Column(name="STATUS")
    private String status;

    @Column(name="SERVICE_FEE")
    private BigDecimal serviceFee;

    @Column(name="CURRENCY_ID")
    private long currencyId;

    @Column(name="TIME")
    private Date time;

    @Column(name="RUNNING_BITCOIN_BALANCE")
    private BigDecimal runningBitcoinBalance;

    @Column(name="RUNNING_CURRENCY_BALANCE")
    private BigDecimal runningCurrencyBalance;

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

        if(this.priceType!=null && this.priceType.equals("MARKET")){
            this.limitPrice=new BigDecimal(0);
        }
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

    public BigDecimal getLimitPrice() {
        return limitPrice;
    }

    public void setLimitPrice(BigDecimal limitPrice) {

        this.limitPrice = limitPrice;
        if(this.limitPrice==null || (this.priceType!=null && this.priceType.equals("MARKET"))){
            this.limitPrice=new BigDecimal(0);
        }

    }

    public BigDecimal getExecutionPrice() {
        return executionPrice;
    }

    public void setExecutionPrice(BigDecimal executionPrice) {
        if(executionPrice==null){
            executionPrice=new BigDecimal(0);
        }
        this.executionPrice = executionPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(BigDecimal serviceFee) {
        if(serviceFee==null){
            serviceFee=new BigDecimal(0);
        }
        this.serviceFee = serviceFee;
    }

    public long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(long currencyId) {
        this.currencyId = currencyId;
    }

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

    public String getmessage(){
        String order = "Details \n   Order from: "+ this.getUser().getUserName()+
                "\n   Order Type: "+this.type+
                "\n   Order Time: "+this.time+
                "\n   Price: "+this.limitPrice+
                "\n   Currency: "+this.currency.getName() +
                "\n   Quantity: "+this.quantity+
                "\n   Execution Price: "+this.executionPrice+
                "\n   Status: "+this.status;
        return order;
    }


    public Order_Table(String userId,String type,String priceType,BigDecimal quantity,BigDecimal limitPrice,
                       BigDecimal executionPrice,String status,BigDecimal serviceFee,long currencyId)
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
        this.setCurrencyId(currencyId);
    }

    public BigDecimal getRunningCurrencyBalance()
    {
        return runningCurrencyBalance;
    }

    public void setRunningCurrencyBalance(BigDecimal runningCurrencyBalance)
    {
        this.runningCurrencyBalance = runningCurrencyBalance;
    }

    public BigDecimal getRunningBitcoinBalance()
    {
        return runningBitcoinBalance;
    }

    public void setRunningBitcoinBalance(BigDecimal runningBitcoinBalance)
    {
        this.runningBitcoinBalance = runningBitcoinBalance;
    }
}
