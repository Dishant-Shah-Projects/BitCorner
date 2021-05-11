package com.bitcorner.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="USER_BANK_INFO")
public class BankInfo {

    @Id
    @Column(name="USER_ID")
    private String userId;

    @Column(name="BANK_NAME")
    private String bankName;

    @Column(name="COUNTRY")
    private String country;

    @Column(name="ACCOUNT_NUMBER")
    private long accountNumber;

    @Column(name="OWNER_NAME")
    private String ownerName;

    @Column(name="STREET")
    private String street;

    @Column(name="CITY")
    private String city;

    @Column(name="STATE")
    private String state;

    @Column(name="ZIP")
    private String zip;

    @ManyToOne()
    @JoinColumn(name="PRIMARY_CURRENCY_ID",insertable = false,updatable = false)
    private Currency primaryCurrency;

    @Column(name="PRIMARY_CURRENCY_ID")
    private long primaryCurrencyId;

    public BigDecimal getInitialBalance()
    {
        return initialBalance;
    }

    public void setInitialBalance(BigDecimal initialBalance)
    {
        if(initialBalance==null){
            initialBalance=new BigDecimal(0);
        }
        this.initialBalance = initialBalance;
    }

    private BigDecimal initialBalance;

    @JsonIgnore
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId)  throws BadAttributeValueExpException {
        if(userId==null || userId.isEmpty()||userId.length()>100){
            throw new BadAttributeValueExpException("User is invalid");
        }
        this.userId = userId;
    }

    public long getPrimaryCurrencyId()
    {
        return primaryCurrencyId;
    }

    public void setPrimaryCurrencyId(long primaryCurrencyId) throws BadAttributeValueExpException
    {
        if(primaryCurrencyId <= 0){
            throw new BadAttributeValueExpException("Currency Id is invalid");
        }
        this.primaryCurrencyId = primaryCurrencyId;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName)  throws BadAttributeValueExpException {
        if(bankName==null || bankName.isEmpty()||bankName.length()>50){
            throw new BadAttributeValueExpException("Bank Name is invalid");
        }
        this.bankName = bankName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country)  throws BadAttributeValueExpException {
        if(country==null || country.isEmpty()||country.length()>50){
            throw new BadAttributeValueExpException("Country is invalid");
        }
        this.country = country;
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(long accountNumber)  throws BadAttributeValueExpException {
        if(accountNumber<=0){
            throw new BadAttributeValueExpException("Account Number is invalid");
        }
        this.accountNumber = accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) throws BadAttributeValueExpException {
        if(ownerName==null || ownerName.isEmpty()||ownerName.length()>50){
            throw new BadAttributeValueExpException("Owner Name is invalid");
        }
        this.ownerName = ownerName;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) throws BadAttributeValueExpException {
        if(street==null || street.isEmpty()||street.length()>100){
            throw new BadAttributeValueExpException("Street is invalid");
        }
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) throws BadAttributeValueExpException {
        if(city==null || city.isEmpty()||city.length()>50){
            throw new BadAttributeValueExpException("City is invalid");
        }
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) throws BadAttributeValueExpException {
        if(state==null || state.isEmpty()||state.length()>50){
            throw new BadAttributeValueExpException("State is invalid");
        }
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) throws BadAttributeValueExpException {
        if(zip==null || zip.isEmpty()||zip.length()>50) {
            throw new BadAttributeValueExpException("Zip is invalid");
        }
            this.zip = zip;
    }

    public Currency getPrimaryCurrency() {
        return primaryCurrency;
    }

    public void setPrimaryCurrency(Currency primaryCurrency) throws BadAttributeValueExpException {
        if(primaryCurrency==null) {
            throw new BadAttributeValueExpException("Primary Currency is invalid");
        }
        this.primaryCurrency = primaryCurrency;
    }

    public BankInfo(String userId, String bankName, String country, long accountNumber, String ownerName, String street, String city, String state, String zip, long primaryCurrencyId) throws BadAttributeValueExpException{
        this.setUserId(userId);
        this.setBankName(bankName);
        this.setCountry(country);
        this.setAccountNumber(accountNumber);
        this.setOwnerName(ownerName);
        this.setStreet(street);
        this.setCity(city);
        this.setState(state);
        this.setZip(zip);
        this.setPrimaryCurrencyId(primaryCurrencyId);
    }

    public BankInfo() {
    }
}
