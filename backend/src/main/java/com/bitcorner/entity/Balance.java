package com.bitcorner.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.xml.bind.v2.TODO;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;

@Entity
@Table(name="USER_BALANCE")
@IdClass(BalanceCompositeId.class)
public class Balance {

    @Id
    @Column(name="USER_ID")
    private String userId;

    @Id
    @Column(name="CURRENCY_ID")
    private long currencyId;

    @Column(name="AMOUNT")
    private float amount;

    @ManyToOne()
    @JoinColumn(name="CURRENCY_ID",insertable = false,updatable = false)
    private Currency currency;

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) throws BadAttributeValueExpException {
        if(currency==null){
            throw new BadAttributeValueExpException("Currency is invalid");
        }
        this.currency = currency;
    }



    @JsonIgnore
    public String    getUserId() {
        return userId;
    }

    public void setUserId(String userId) throws BadAttributeValueExpException{
        if(userId==null || userId.isEmpty()||userId.length()>100){
            throw new BadAttributeValueExpException("User is invalid");
        }
        this.userId = userId;
    }

    public long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(long currencyId) {

        this.currencyId = currencyId;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) throws BadAttributeValueExpException{
        if(amount<0){
            throw new BadAttributeValueExpException("Amount is invalid");
        }
        this.amount = amount;
    }

    public void addAmount(float amount)throws BadAttributeValueExpException{
        this.setAmount(this.amount+amount);
    }

    public void subtractAmount(float amount)throws BadAttributeValueExpException{
        this.setAmount(this.amount-amount);
    }
    public Balance(){

    }
    public Balance(String userId, long currencyId, float amount) throws BadAttributeValueExpException{

        this.setUserId(userId);
        this.setCurrencyId(currencyId);
        this.setAmount(amount);
    }
}
