package com.bitcorner.entity;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;

@Entity
@Table(name="CURRENCY")
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="NAME")
    private String name;

    @Column(name="CONVERSION_RATE")
    private float conversionRate;

    @Column(name="IS_CRYPTO")
    private boolean isCrypto;

    @Column(name="IS_BASE")
    private boolean isBase;

    @Column(name="INITIAL_VALUE")
    private float initialValue;

    public float getInitialValue() {
        return initialValue;
    }

    public void setInitialValue(float initialValue) throws BadAttributeValueExpException {
        if(initialValue<0){
            throw new BadAttributeValueExpException("Initial value is invalid");
        }
        this.initialValue = initialValue;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) throws BadAttributeValueExpException {
        if(name==null || name.isEmpty() || name.length()>50){
            throw new BadAttributeValueExpException("Currency Name is invalid");
        }
        this.name = name;
    }

    public float getConversionRate() {
        return conversionRate;
    }

    public void setConversionRate(float conversionRate) throws BadAttributeValueExpException{
        if(conversionRate<=0){
            throw new BadAttributeValueExpException("Conversion Rate is invalid");
        }
        this.conversionRate = conversionRate;
    }

    public boolean isCrypto() {
        return isCrypto;
    }

    public void setCrypto(boolean crypto) {
        isCrypto = crypto;
    }

    public boolean isBase() {
        return isBase;
    }

    public void setBase(boolean base) {
        isBase = base;
    }

    public Currency(String name, float conversionRate) throws BadAttributeValueExpException{
        this.setName(name);
        this.setConversionRate(conversionRate);
    }

    public Currency() {
    }
}
